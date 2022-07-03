import { RootState } from '../types';

export const userSelector = (store: RootState) => store.user;
export const userInfo = (store: RootState) => store.user.user;
