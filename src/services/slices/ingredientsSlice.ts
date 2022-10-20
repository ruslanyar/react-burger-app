import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getIngredients } from '../thunks/ingredients';
import { IIngredient } from '../types/data';

type TIngredientsState = {
  list: IIngredient[];
  request: boolean;
  failed: boolean;
  error: string | undefined;
};

const initialState: TIngredientsState = {
  list: [],
  request: false,
  failed: false,
  error: undefined,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.request = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.request = false;
        state.list = action.payload;
        state.failed = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.failed = true;
        state.error = action.payload;
      });
  },
});

export const selectIngredients = (state: RootState) => state.ingredients;

export default ingredientsSlice.reducer;
