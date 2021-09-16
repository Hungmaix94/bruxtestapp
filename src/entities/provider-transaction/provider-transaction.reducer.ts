import axios from 'axios';

import { cleanEntity } from 'src/shared/util/entity-utils';

import { IProviderTransaction, defaultValue } from 'src/shared/model/provider-transaction.model';
import { EntityState, serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';

interface EntityProviderTransactionState extends EntityState<IProviderTransaction> {
  providerTransactionPaidUrl?: any;
  isUpdateProvTransPaidUrl?: boolean;
}

const initialState: EntityProviderTransactionState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProviderTransaction>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  providerTransactionPaidUrl: { redirectUri: null },
  isUpdateProvTransPaidUrl: false,
};

const apiUrl = 'api/provider-transactions';

export type ProviderTransactionState = Readonly<typeof initialState>;

// Actions
export const getEntities = createAsyncThunk('providerTransaction/fetch_entity_list', async (params: any) => {
  return axios.get<IProviderTransaction[]>(apiUrl, { params });
});

export const getEntity = createAsyncThunk(
  'providerTransaction/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IProviderTransaction>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const updateProviderTransactionPaidUrl = createAsyncThunk(
  'providerTransaction/paid_entity',
  async (id: number, thunkAPI) => {
    const result = await axios.put<IProviderTransaction>(`${apiUrl}/paid-url/${id}`);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice
export const ProviderTransactionSlice = createSlice({
  name: 'providerTransaction',
  initialState: initialState as ProviderTransactionState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = true;
        state.updateSuccess = false;
        state.entity = action.payload.data;
      })
      .addCase(updateProviderTransactionPaidUrl.fulfilled, (state, action) => {
        state.updateSuccess = false;
        state.updating = true;
        state.isUpdateProvTransPaidUrl = false;
        state.providerTransactionPaidUrl = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

// Reducer
export default ProviderTransactionSlice.reducer;
