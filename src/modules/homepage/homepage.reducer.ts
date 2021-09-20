import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from '../../app/config/store';
import axios from "axios";
import {EntityState} from "../../shared/reducers/reducer.utils";
//@ts-ignore
import {REACT_APP_API_MAPBOX} from '@env';
export interface IGeocoding {
    type?: string,
    query?: any,
    features?: any
}

const defaultValue: Readonly<IGeocoding> = {
    features: []
};


const initialState: EntityState<IGeocoding> = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: defaultValue,
    updating: false,
    totalItems: 0,
    updateSuccess: false,
};


const access_token = REACT_APP_API_MAPBOX;

export const fetchPlace = createAsyncThunk(
  'homepage/fetchPlace',
  async (search_text: string) => {
      console.log(access_token,'access_token', `/${encodeURIComponent(search_text)}.json?access_token=${access_token}`);
    return  axios.get<IGeocoding>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(search_text)}.json?access_token=${access_token}`, {baseURL: ""});
  }
);

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlace.pending, (state) => {
          state.errorMessage = null;
          state.updateSuccess = false;
          state.loading = true;
      })
      .addCase(fetchPlace.fulfilled, (state, action) => {
          state.updating = false;
          state.loading = false;
          state.updateSuccess = true;
          state.entity = action.payload.data;
      });
  },
});

export const placeSelector = (state: IRootState) => state?.homepage?.entity?.features;


export default homepageSlice.reducer;
