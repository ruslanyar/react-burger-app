import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { AppDispatch, AppThunk, TRootState } from '../types';

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch | AppThunk>();
