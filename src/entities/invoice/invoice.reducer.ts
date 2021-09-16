import axios from 'axios';
import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { IDevice, defaultValue } from 'src/shared/model/device.model';
import { EntityState, serializeAxiosError } from 'src/shared/reducers/reducer.utils';

interface EntityDevice extends EntityState<IDevice> {
  statistic?: any;
}

const initialState: EntityDevice = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  statistic: {
    totalPurchasedDevices: 0,
    totalTakenDevices: 0,
    totalResoldDevices: 0,
    totalReturnedDevices: 0,
  },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/invoices';

export const getInvoices = createAsyncThunk('invoices/getInvoices', async (params: any) => {
  return axios.get<IDevice[]>(apiUrl, { params: { ...params, cacheBuster: new Date().getTime() } });
});

export const getDownloadInvoices = createAsyncThunk(
  'invoices/getDownloadInvoices',
  async (id: string, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}/download-url`;
    const response = await axios.get(requestUrl);
    if (response.status === 200) {
      const result = await axios.get<BlobPart>(response.data, {
        responseType: 'blob',
      });

      result.headers['fileName'] = response?.data?.split('/').pop().split('#')[0].split('?')[0];
      return result;
    }
    return response;
  },
  { serializeError: serializeAxiosError }
);

export type InvoicesState = Readonly<typeof initialState>;

export const InvoicesSlice = createSlice({
  name: 'invoices',
  initialState: initialState as InvoicesState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getInvoices), (state, action) => {
        state.loading = false;
        state.entities = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(getDownloadInvoices), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = true;
        state.exportData = {
          data: action.payload.data,
          fileName: action?.payload?.headers?.fileName,
        };
      })

      .addMatcher(isPending(getInvoices, getDownloadInvoices), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })

      .addMatcher(isRejected(getInvoices, getDownloadInvoices), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action?.error?.message|| "";
      });
  },
});

export const { reset } = InvoicesSlice.actions;

// Reducer
export default InvoicesSlice.reducer;
