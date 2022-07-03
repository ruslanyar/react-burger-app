import { RootState } from '../types';

export const constructorIngredients = (store: RootState) => store.burger.ingredients;
