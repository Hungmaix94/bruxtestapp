import axios from 'axios';
import { createAction, createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'src/shared/util/entity-utils';
import { createEntitySlice, EntityState, serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { IOrder, defaultValue } from 'src/shared/model/order.model';

interface EntityAccessories extends EntityState<IOrder> {
  statistic: StatisticObject;
}

interface StatisticObject {
  soldDeviceCount?: string | number;
  soldAccessoryCount?: string | number;
}

const initialState: EntityAccessories = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  statistic: {
    soldDeviceCount: 0,
    soldAccessoryCount: 0,
  },
  updateSuccess: false,
};

const apiUrl = 'api/orders';

// Actions

export const getEntities = createAsyncThunk('order/fetch_entity_list', async (params: any) => {
  return axios.get<IOrder[]>(apiUrl, { params });
});

export const getEntity = createAsyncThunk(
  'order/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IOrder>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const showNoDeviceNoti = createAction('order/show_no_device_noti', (payload: { errorMessage?: string }) => ({ payload }));

export const closeNoDeviceNoti = createAction('order/close_no_device_noti', payload => ({ payload }));

export const createEntity = createAsyncThunk(
  'order/create_entity',
  async (entity: IOrder, thunkAPI) => {
    const result = await axios.post<IOrder>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const placeOder = createAsyncThunk(
  'order/place',
  async (entity: IOrder, thunkAPI) => {
    try {
      const result = await axios.post<IOrder>(`${apiUrl}/place`, cleanEntity(entity));
      thunkAPI.dispatch(getEntities({}));
      return result;
    } catch (err) {
      if (err?.response?.data?.message && err?.response?.data?.message === 'error.noAvailableQuantityInStock') {
        thunkAPI.dispatch(showNoDeviceNoti({ errorMessage: err.response.data.message }));
        return thunkAPI.fulfillWithValue(err.response.data.message);
      }
      throw err;
    }
  },
  { serializeError: serializeAxiosError }
);

export const getOrderDetail = createAsyncThunk(
  'order/getOrderDetail',
  async (id: string | number) => {
    return axios.get<IOrder>(`${apiUrl}/${id}/detail`);
  },
  { serializeError: serializeAxiosError }
);

export const finalizeOrder = createAsyncThunk(
  'order/finalizeOrder',
  async (params: any) => {
    return axios.put<IOrder[]>(`${apiUrl}/${params.id}/finalize`, params);
  },
  { serializeError: serializeAxiosError }
);

export const getStatistic = createAsyncThunk(
  'order/getStatistic',
  async () => {
    return axios.get<IOrder[]>(`${apiUrl}/statistic`);
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'order/update_entity',
  async (entity: IOrder, thunkAPI) => {
    const result = await axios.put<IOrder>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'order/partial_update_entity',
  async (entity: IOrder, thunkAPI) => {
    const result = await axios.patch<IOrder>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'order/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IOrder>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const OrderSlice = createEntitySlice({
  name: 'order',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(showNoDeviceNoti, (state, action) => {
        state.errorMessage = action?.payload?.errorMessage||"";
      })
      .addCase(closeNoDeviceNoti, state => {
        state.errorMessage = '';
      })
      .addCase(placeOder.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addCase(finalizeOrder.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
      })
      .addCase(getStatistic.fulfilled, (state, action) => {
        state.updating = false;
        state.updateSuccess = true;
        state.statistic = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, placeOder, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity, getStatistic, getOrderDetail), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, placeOder, updateEntity, partialUpdateEntity, deleteEntity, finalizeOrder), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = OrderSlice.actions;

// Reducer
export default OrderSlice.reducer;
