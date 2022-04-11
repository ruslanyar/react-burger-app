import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS = 'SORT_INGREDIENTS';

export const addIngredient = (item) => {
  item.keyId = uuidv4();
  return { type: ADD_INGREDIENT, payload: item };
}

export const sortIngredients = (dragIndex, dropIndex) => {
  return (dispatch, getState) => {
    const sortableIngredients = getState().burger.ingredients.other;
    sortableIngredients.splice(dropIndex, 0, ...sortableIngredients.splice(dragIndex, 1));
    dispatch({ type: SORT_INGREDIENTS, payload: sortableIngredients });
  }
}
