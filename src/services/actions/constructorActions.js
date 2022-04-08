import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const addIngredient = (item) => {
  item.keyId = uuidv4();
  return { type: ADD_INGREDIENT, ingredient: item }
}
