import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderFetch } from '../../utils/api';
import { IOrder } from '../types/data';

export const sendOrderAsyncThunk = createAsyncThunk<
  IOrder,
  { ids: string[]; accessToken: string },
  { rejectValue: string }
>(
  'order/sendOrderAsyncThunk',
  async ({ ids, accessToken }, { rejectWithValue }) => {
    const response = await orderFetch(ids, accessToken);
    const data = await response.json();

    if (!data.success) {
      return rejectWithValue('Server Error!');
    }

    return data;
  }
);
