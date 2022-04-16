export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

export const openIngredientDetails = (data) => {
  return { type: SET_INGREDIENT_DETAILS, payload: data };
}
