import { createAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IOrdersResponse } from '../types/data';

type TWsAuthState = {
  wsAuthConnected: boolean;
  orders: IOrdersResponse;
};

const initialState: TWsAuthState = {
  wsAuthConnected: false,
  orders: {
    orders: [],
    total: 0,
    totalToday: 0,
  },
};

const wsAuthSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    authConnectionSuccess: (state) => {
      state.wsAuthConnected = true;
    },
    authConnectionClosed: (state) => {
      state.wsAuthConnected = false;
    },
    authConnectionError: (state) => {
      state.wsAuthConnected = false;
    },
    getAuthOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const wsAuthStart = createAction('WS_AUTH_START');
export const wsAuthClose = createAction('WS_AUTH_CLOSE');

export const {
  authConnectionSuccess,
  authConnectionClosed,
  authConnectionError,
  getAuthOrders,
} = wsAuthSlice.actions;

export const selectWsAuthOrders = (state: RootState) => state.wsAuth.orders;

export default wsAuthSlice.reducer;
