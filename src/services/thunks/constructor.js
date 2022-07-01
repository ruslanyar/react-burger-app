import { v4 as uuidv4 } from 'uuid';
import { BUN } from '../../utils/constants';
import { addIngredientAction, deleteIngredientAction, sortIngredientsAction } from '../actions';

export const addIngredientThunk = (itemId) => {
  return (dispatch, getState) => {
    const constructorIngredients = getState().burger.ingredients;
    const item = {
      ...getState().ingredients.ingredients.find(i => i._id === itemId),
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

export const deleteIngredientThunk = (itemId) => {
  return (dispatch, getState) => {
    const list = getState().burger.ingredients.topings
      .filter(i => i.keyId !== itemId);

    dispatch(deleteIngredientAction(list));
  }
};

export const sortIngredientsThunk = (dragIndex, dropIndex) => {
  return (dispatch, getState) => {
    const sortableIngredients = getState().burger.ingredients.topings;
    sortableIngredients.splice(dropIndex, 0, ...sortableIngredients.splice(dragIndex, 1));
    dispatch(sortIngredientsAction(sortableIngredients));
  }
};
