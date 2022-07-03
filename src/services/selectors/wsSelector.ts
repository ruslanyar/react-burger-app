import { RootState } from '../types';

export const wsSelector = (store: RootState) => store.ws;
export const getOrders = (store: RootState) => store.ws.orders;
