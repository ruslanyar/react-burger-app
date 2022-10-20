import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { sendOrderAsyncThunk } from '../thunks/order';
import { IOrder } from '../types/data';


type TOrderDetailsState = {
  order: IOrder | null;
  request: boolean;
  failed: boolean;
  isEmpty: boolean;
};

const initialState: TOrderDetailsState = {
  order: null,
  request: false,
  failed: false,
  isEmpty: true,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    emptyOrder: (state) => {
      state.isEmpty = true;
    },
    clearOrderDetails: (state) => {
      state.order = null;
      state.request = false;
      state.failed = false;
      state.isEmpty = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderAsyncThunk.pending, (state) => {
        state.request = true;
      })
      .addCase(sendOrderAsyncThunk.fulfilled, (state, action) => {
        state.request = false;
        state.isEmpty = false;
        state.order = action.payload;
      })
      .addCase(sendOrderAsyncThunk.rejected, (state) => {
        state.request = false;
        state.failed = true;
      })
  }
});

export const selectOrder = (state: RootState) => state.order;

export const { emptyOrder, clearOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
