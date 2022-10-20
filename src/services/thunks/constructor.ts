import { v4 as uuid } from 'uuid';

import { AppThunk } from '../store';
import {
  addIngredient,
  deleteIngredient,
  selectBurgerIngredients,
  sortIngredients,
} from '../slices/constructorSlice';
import { selectIngredients } from '../slices/ingredientsSlice';
import { BUN, TOPINGS } from '../../utils/constants';

export const addIngredientToConstructor =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    const burgerIngredients = selectBurgerIngredients(getState());
    const ingredientsList = selectIngredients(getState()).list;
    const ingredient = ingredientsList.find((i) => i._id === id);

    if (ingredient) {
      // ingredient.keyId = uuid();
      const ingredientWithKeyId = { ...ingredient, keyId: uuid() }
      const isBun = ingredientWithKeyId.type === BUN;

      const newBurgerIngredients = {
        ...burgerIngredients,
        [isBun ? BUN : TOPINGS]: isBun
          ? [ingredientWithKeyId]
          : [...burgerIngredients.topings, ingredientWithKeyId],
      };

      dispatch(addIngredient(newBurgerIngredients));
    } else {
      console.log('Wrong ingredient id');
    }
  };

export const deleteIngredientFromConstructor =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    const topingsList = selectBurgerIngredients(getState()).topings;
    const newTopingsList = topingsList.filter((i) => i._id !== id);
    const isEmpty = newTopingsList.length === 0;

    dispatch(deleteIngredient({ newTopingsList, isEmpty }));
  };

export const sortIngredientsInConstructor =
  (dragIndex: number, dropIndex: number): AppThunk =>
  (dispatch, getState) => {
    const topingsList = [...selectBurgerIngredients(getState()).topings];
    const [dragedIngredient] = topingsList.splice(dragIndex, 1);
    topingsList.splice(
      dropIndex,
      0,
      dragedIngredient
    );

    dispatch(sortIngredients(topingsList));
  };
