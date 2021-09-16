import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'src/shared/util/entity-utils';
import { EntityState, serializeAxiosError, isRejectedAction } from 'src/shared/reducers/reducer.utils';
import { IDeviceAccessory, defaultValue } from 'src/shared/model/device-accessory.model';

interface EntityAccessories extends EntityState<IDeviceAccessory> {
  statistic: StatisticObject;
  availableAccessories: IAvailableAccessories[];
}

interface StatisticObject {
  totalOfAccessories?: string | number;
  totalOfComplaintAccessories?: string | number;
  totalOfSoldAccessories?: string | number;
  totalAmountOfSoldAccessories?: string | number;
}

interface IAvailableAccessories {
  id?: number;
  availableQuantity?: number;
  deviceAccessoryTypeId?: number;
  deviceAccessoryTypeEnumKey?: string;
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
const apiDeviceAvailableUrl = 'api/device-accessory-stocks';

export const getEntities = createAsyncThunk('deviceAccessory/fetch_entity_list', async (params: any) => {
  return axios.get<IDeviceAccessory[]>(apiUrl, { params: { ...params, cacheBuster: new Date().getTime() } });
});

export const getEntity = createAsyncThunk(
  'deviceAccessory/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IDeviceAccessory>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getAccessoriesStatistic = createAsyncThunk(
  'deviceAccessory/getAccessoriesStatistic',
  async () => {
    const requestUrl = `${apiUrl}/statistic`;
    return axios.get<StatisticObject>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getAccessoriesAvailable = createAsyncThunk(
  'deviceAccessory/getAccessoriesAvailable',
  async () => {
    return axios.get<IAvailableAccessories[]>(apiDeviceAvailableUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'deviceAccessory/create_entity',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const result = await axios.post<IDeviceAccessory>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const registerComplaint = createAsyncThunk(
  'deviceAccessory/registerComplaint',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const requestUrl = `${apiUrl}/${entity.id}/register-complaint`;
    const result = await axios.put<IDeviceAccessory>(requestUrl, cleanEntity(entity));
    if (result.status === 200) {
      result.headers['x-bruxtestapp-alert'] = 'bruxTestApp.deviceAccessory.complaintRegistered';
    }
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'deviceAccessory/update_entity',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const result = await axios.put<IDeviceAccessory>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'deviceAccessory/partial_update_entity',
  async (entity: IDeviceAccessory, thunkAPI) => {
    const result = await axios.patch<IDeviceAccessory>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'deviceAccessory/delete_entity',
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
  name: 'deviceAccessory',
  initialState: initialState as DeviceAccessoryState,
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
        return {
          ...state,
          loading: false,
          statistic: action.payload.data,
        };
      })
      .addCase(getAccessoriesAvailable.fulfilled, (state, action) => {
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
