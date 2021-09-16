import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'src/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { IOffer, defaultValue } from 'src/shared/model/offer.model';

const initialState: EntityState<IOffer> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/offers';

// Actions

export const getEntities = createAsyncThunk('offer/fetch_entity_list', async (params: any) => {
  return axios.get<IOffer[]>(apiUrl, { params });
});

export const getEntity = createAsyncThunk(
  'offer/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IOffer>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'offer/create_entity',
  async (entity: IOffer, thunkAPI) => {
    const result = await axios.post<IOffer>(apiUrl, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'offer/update_entity',
  async (entity: IOffer, thunkAPI) => {
    const result = await axios.put<IOffer>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'offer/partial_update_entity',
  async (entity: IOffer, thunkAPI) => {
    const result = await axios.patch<IOffer>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'offer/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IOffer>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deactivateOffer = createAsyncThunk(
  'offer/deactivate_entity',
  async (offerId: number) => {
    const result = await axios.put(`${apiUrl}/${offerId}/deactivate`);
    if (result.status === 204) {
      result.headers['x-bruxtestapp-alert'] = 'bruxTestApp.offer.deactivated';
    }
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const restoreOffer = createAsyncThunk(
  'offer/restore_entity',
  async (offerId: number) => {
    const result = await axios.put(`${apiUrl}/${offerId}/restore`);
    if (result.status === 204) {
      result.headers['x-bruxtestapp-alert'] = 'bruxTestApp.offer.restored';
    }
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const OfferSlice = createEntitySlice({
  name: 'offer',
  initialState,
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
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(restoreOffer, deactivateOffer), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
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
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity, restoreOffer, deactivateOffer), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = OfferSlice.actions;

// Reducer
export default OfferSlice.reducer;
