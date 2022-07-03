import { TRootState } from '../types';

export const getUserOrders = (store: TRootState) => store.wsAuth.orders;
