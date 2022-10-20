import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IIngredient } from '../types/data';

type TBurgerIngredients = {
  bun: Array<IIngredient>;
  topings: Array<IIngredient>;
};

type TConstructorState = {
  ingredients: TBurgerIngredients;
  isEmpty: boolean;
};

const initialState: TConstructorState = {
  ingredients: {
    bun: [],
    topings: [],
  },
  isEmpty: true,
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TBurgerIngredients>) => {
      state.ingredients = action.payload;
      state.isEmpty = false;
    },
    deleteIngredient: (
      state,
      action: PayloadAction<{ newTopingsList: IIngredient[]; isEmpty: boolean }>
    ) => {
      state.ingredients.topings = action.payload.newTopingsList;
      state.isEmpty = action.payload.isEmpty;
    },
    sortIngredients: (state, action: PayloadAction<IIngredient[]>) => {
      state.ingredients.topings = action.payload;
    },
    clearConstructor: (state) => {
      state.ingredients = initialState.ingredients;
      state.isEmpty = true;
    },
  },
});

export const {
  addIngredient,
  deleteIngredient,
  sortIngredients,
  clearConstructor,
} = constructorSlice.actions;

export const selectBurgerIngredients = (state: RootState) =>
  state.burger.ingredients;

export default constructorSlice.reducer;
