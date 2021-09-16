import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/config/store';
import { fetchCount } from './homepageAPI';

export interface CounterState {

}

const initialState: CounterState = {

};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const getOffer = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {

    },
    decrement: (state) => {

    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {

      })
      .addCase(incrementAsync.fulfilled, (state, action) => {

      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectCount = (state: RootState) => state.counter.value;



export default counterSlice.reducer;
