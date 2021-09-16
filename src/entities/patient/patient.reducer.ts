import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';

import { cleanEntity } from 'src/shared/util/entity-utils';
import { createEntitySlice, EntityState, serializeAxiosError } from 'src/shared/reducers/reducer.utils';
import { defaultPatient, IPatient } from 'src/shared/model/client.model';

const initialState: EntityState<IPatient> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultPatient,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/clients/patients';

// Actions

export const getEntities = createAsyncThunk('patients/fetch_patient', async (params: any) => {
  return axios.get<IPatient[]>(apiUrl, { params });
});

export const getEntity = createAsyncThunk(
  'patients/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IPatient>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'patients/create_entity',
  async (entity: any, thunkAPI) => {
    const response = await axios.post<IPatient>(apiUrl, cleanEntity(entity));
    if (response.status === 204) {
      response.headers['x-bruxtestapp-alert'] = 'patient.created';
    }
    return response;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'patients/update_entity',
  async (entity: any, thunkAPI) => {
    const response = await axios.put<IPatient>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    if (response.status === 204) {
      response.headers['x-bruxtestapp-alert'] = 'patient.updated';
    }
    return response;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'patients/partial_update_entity',
  async (params: any, thunkAPI) => {
    return await axios.patch<IPatient>(`${apiUrl}/${params.id}`, cleanEntity(params.entity));
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'patients/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IPatient>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deactivateClient = createAsyncThunk(
  'patients/deactivate_entity',
  async (clientId: number) => {
    return await axios.put(`${apiUrl}/${clientId}/deactivate`);
  },
  { serializeError: serializeAxiosError }
);

export const restoreClient = createAsyncThunk(
  'patients/restore_entity',
  async (clientId: number) => {
    return await axios.put(`${apiUrl}/${clientId}/restore`);
  },
  { serializeError: serializeAxiosError }
);

// slice
export const PatientSlice = createEntitySlice({
  name: 'patient',
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
      .addMatcher(isFulfilled(restoreClient, deactivateClient), (state, action) => {
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
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity, restoreClient, deactivateClient), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = PatientSlice.actions;

// Reducer
export default PatientSlice.reducer;
