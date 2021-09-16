import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { createEntitySlice, EntityState, IQueryParams } from 'src/shared/reducers/reducer.utils';
import axios from 'axios';
import { IMedCenter } from 'src/shared/model/med-center.model';
import { defaultValue } from 'src/shared/model/med-center.model';

const initialState: EntityState<IMedCenter> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/clients/med-centers';

export const getEntities = createAsyncThunk('medCenter/fetch_entity_list', async (params: any) => {
  return axios.get<IMedCenter[]>(apiUrl, { params: { ...params, cacheBuster: new Date().getTime() } });
});

export const ClientRegisterSlice = createEntitySlice({
  name: 'clientRegister',
  initialState,
  extraReducers(builder) {
    builder
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isPending(getEntities), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      });
  },
});

export const { reset } = ClientRegisterSlice.actions;

// Reducer
export default ClientRegisterSlice.reducer;
