import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL, INGREDIENTS_ENDPOINT } from '../../utils/constants';

import { IIngredient, TIngredientsResponse } from '../types/data';

export const getIngredients = createAsyncThunk<IIngredient[], void, { rejectValue: string }>(
  'ingredients/getIngredients',
  async (_, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}/${INGREDIENTS_ENDPOINT}`);
    const jsonData: TIngredientsResponse = await response.json();

    if (!jsonData.success) {
      return rejectWithValue('Server Error!');
    }

    return jsonData.data;
  }
);
