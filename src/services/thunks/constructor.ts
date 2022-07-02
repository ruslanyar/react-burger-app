import { v4 as uuidv4 } from 'uuid';
import { BUN } from '../../utils/constants';
import { addIngredientAction, deleteIngredientAction, sortIngredientsAction } from '../actions';
import { AppDispatch, AppThunk } from '../types';
import { IIngredient } from '../types/data';

export const addIngredientThunk: AppThunk = (itemId) => {
  return (dispatch: AppDispatch, getState) => {
    const constructorIngredients = getState().burger.ingredients;
    const item = {
      ...getState().ingredients.ingredients.find((i: IIngredient) => i._id === itemId),
      keyId: uuidv4(),
    };
    const payload = {
      ...constructorIngredients,
      [item.type === BUN ? item.type : 'topings']: item.type === BUN
        ? [item]
        : [
            ...constructorIngredients.topings,
            item,
          ]
    };
    
    dispatch(addIngredientAction(payload));
  }
};

export const deleteIngredientThunk: AppThunk = (itemId) => {
  return (dispatch: AppDispatch, getState) => {
    const list = getState().burger.ingredients.topings
      .filter((i: IIngredient) => i.keyId !== itemId);

    dispatch(deleteIngredientAction(list));
  }
};

export const sortIngredientsThunk: AppThunk = (dragIndex, dropIndex) => {
  return (dispatch: AppDispatch, getState) => {
    const sortableIngredients = getState().burger.ingredients.topings;
    sortableIngredients.splice(dropIndex, 0, ...sortableIngredients.splice(dragIndex, 1));
    dispatch(sortIngredientsAction(sortableIngredients));
  }
};
