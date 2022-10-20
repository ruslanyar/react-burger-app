import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IOrdersResponse } from '../types/data';

type TWsState = {
  wsConnected: boolean;
  orders: IOrdersResponse;
};

const initialState: TWsState = {
  wsConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    connectionSuccess: (state) => {
      state.wsConnected = true;
    },
    connectionClosed: (state) => {
      state.wsConnected = false;
    },
    connectionError: (state) => {
      state.wsConnected = false;
    },
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const wsStart = createAction('WS_START');
export const wsClose = createAction('WS_CLOSE');

export const {
  connectionSuccess,
  connectionClosed,
  connectionError,
  getOrders,
} = wsSlice.actions;

export const selectWsOrders = (state: RootState) => state.ws.orders;

export default wsSlice.reducer;
