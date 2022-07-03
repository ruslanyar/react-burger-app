import { TRootState } from '../types';

export const constructorIngredients = (store: TRootState) => store.burger.ingredients;
