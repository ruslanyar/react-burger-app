import { IIngredient } from '../burger-ingredients/burger-ingredients.types';

export interface IBurgerConstructorItem {
  ingredient: IIngredient;
  index: number;
}
