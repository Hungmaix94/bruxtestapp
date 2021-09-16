import axios from 'axios';
import { get } from 'lodash';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IDevice, defaultValue } from 'src/shared/model/device.model';
import { EntityState, IQueryParams, serializeAxiosError } from 'src/shared/reducers/reducer.utils';

interface EntityDevice extends EntityState<IDevice> {
  statistic?: IStatistic;
}

interface IStatistic {
  availableDeviceCount?: string | number;
  totalTakenDevices?: string | number;
  totalResoldDevices?: string | number;
  totalReturnedDevices?: string | number;
}

const initialState: EntityDevice = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  statistic: {
    availableDeviceCount: 0,
    totalTakenDevices: 0,
    totalResoldDevices: 0,
    totalReturnedDevices: 0,
  },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/device-clients';

export const getDeviceClient = createAsyncThunk('deviceClient/getDeviceClient', async (params: any) => {
  return axios.get<IDevice[]>(apiUrl, { params: { ...params, cacheBuster: new Date().getTime() } });
});

export const getDeviceClientStatistic = createAsyncThunk(
  'deviceClient/getDeviceClientStatistic',
  async () => {
    const requestUrl = `${apiUrl}/statistic`;
    return axios.get<IStatistic>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export type DeviceClientsState = Readonly<typeof initialState>;

export const DeviceClientsSlice = createSlice({
  name: 'deviceClients',
  initialState: initialState as DeviceClientsState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getDeviceClientStatistic.fulfilled, (state, action) => {
        state.loading = false;
        state.statistic = get(action, 'payload.data');
      })
      .addMatcher(isFulfilled(getDeviceClient), (state, action) => {
        state.loading = false;
        state.entities = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })

      .addMatcher(isPending(getDeviceClient, getDeviceClientStatistic), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })

      .addMatcher(isRejected(getDeviceClient, getDeviceClientStatistic), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action?.error?.message||"";
      });
  },
});

export const { reset } = DeviceClientsSlice.actions;

// Reducer
export default DeviceClientsSlice.reducer;
