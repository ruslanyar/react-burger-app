import { RootState } from '../types';

export const getUserOrders = (store: RootState) => store.wsAuth.orders;
