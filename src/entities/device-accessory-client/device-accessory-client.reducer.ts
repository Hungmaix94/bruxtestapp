import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'src/shared/util/entity-utils';
import { createEntitySlice, EntityState, isRejectedAction, serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { IDeviceAccessory, defaultValue } from 'src/shared/model/device-accessory.model';
import { getAccessoriesAvailable } from 'src/entities/device-accessory/device-accessory.reducer';

interface IStatistic {
  totalNumberOfPurchasedAccessories?: string | number;
}

interface IAvailableAccessories {
  id?: number;
  availableQuantity?: number;
  deviceAccessoryTypeId?: number;
  deviceAccessoryTypeEnumKey?: string;
}

interface EntityAccessories extends EntityState<IDeviceAccessory> {
  statistic: IStatistic;
  availableAccessories: IAvailableAccessories[];
}

const initialState: EntityAccessories = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  statistic: {},
  availableAccessories: [],
};

const apiUrl = 'api/device-accessories';
const apiDeviceAvailableUrl = 'api/med-center-device-accessory-stocks';

export const getEntities = createAsyncThunk('deviceAccessory/fetch_entity_list', async (params: any) => {
  return axios.get<IDeviceAccessory[]>(apiUrl, { params: { ...params, cacheBuster: new Date().getTime() } });
});
export const getEntity = createAsyncThunk(
  'deviceAccessoryClient/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IDeviceAccessory>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getAccessoriesStatistic = createAsyncThunk(
  'deviceAccessoryClient/getAccessoriesStatistic',
  async () => {
    const requestUrl = `${apiUrl}/statistic`;
    return axios.get<IStatistic>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getAccessoriesAvailableClient = createAsyncThunk(
  'deviceAccessoryClient/getAccessoriesAvailable',
  async () => {
    return axios.get<IAvailableAccessories[]>(apiDeviceAvailableUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'deviceAccessoryClient/create_entity',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const result = await axios.post<IDeviceAccessory>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const registerComplaint = createAsyncThunk(
  'deviceAccessoryClient/registerComplaint',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const requestUrl = `${apiUrl}/${entity.id}/register-complaint`;
    const result = await axios.put<IDeviceAccessory>(requestUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'deviceAccessoryClient/update_entity',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const result = await axios.put<IDeviceAccessory>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'deviceAccessoryClient/partial_update_entity',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const result = await axios.patch<IDeviceAccessory>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'deviceAccessoryClient/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IDeviceAccessory>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice
export type DeviceAccessoryState = Readonly<typeof initialState>;

export const DeviceAccessorySlice = createSlice({
  name: 'deviceAccessoryClient',
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addCase(getAccessoriesStatistic.fulfilled, (state, action) => {
        state.loading = false;
        state.statistic = action.payload.data;
      })
      .addCase(getAccessoriesAvailableClient.fulfilled, (state, action) => {
        state.loading = false;
        state.availableAccessories = action.payload.data;
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity, registerComplaint), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity, registerComplaint), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = DeviceAccessorySlice.actions;

// Reducer
export default DeviceAccessorySlice.reducer;
