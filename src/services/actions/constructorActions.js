import { v4 as uuidv4 } from 'uuid';
import { BUN } from '../../utils/constants';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngredient = (itemId) => {
  return (dispatch, getState) => {
    const constructorIngredients = getState().burger.ingredients;
    const item = {...getState().ingredients.ingredients.find(i => i._id === itemId)};
    item.keyId = uuidv4();
    const payload = {
      ...constructorIngredients,
      [item.type === BUN ? item.type : 'other']: item.type === BUN
        ? [item]
        : [
            ...constructorIngredients.other,
            item,
          ]
    };
    
    dispatch({ type: ADD_INGREDIENT, payload });
  }
}

export const deleteIngredient = (itemId) => {
  return (dispatch, getState) => {
    const list = [...getState().burger.ingredients.other]
      .filter(i => i.keyId !== itemId);

    dispatch({ type: DELETE_INGREDIENT, payload: list });
  }
}

export const sortIngredients = (dragIndex, dropIndex) => {
  return (dispatch, getState) => {
    const sortableIngredients = getState().burger.ingredients.other;
    sortableIngredients.splice(dropIndex, 0, ...sortableIngredients.splice(dragIndex, 1));
    dispatch({ type: SORT_INGREDIENTS, payload: sortableIngredients });
  }
}
