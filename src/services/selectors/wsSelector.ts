import { TRootState } from '../types';

export const wsSelector = (store: TRootState) => store.ws;
export const getOrders = (store: TRootState) => store.ws.orders;
