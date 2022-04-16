import { BASE_URL, INGREDIENTS, BUN } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';
export const RESET_INGREDIENTS_COUNT = 'RESET_INGREDIENTS_COUNT';

function addCountInIngredient(data) {
  data.forEach(i => i.count = 0);
  return { type: GET_INGREDIENTS_SUCCESS, payload: data };
}

export function getIngredients() {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetch(`${BASE_URL}${INGREDIENTS}`)
      .then(checkResponse)
      .then(json => dispatch(addCountInIngredient(json.data)))
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  }
}

export function increaseIngredientCount(itemId) {
  return (dispatch, getState) => {
    const { ingredients } = getState().ingredients;
    const increasedIngredient = ingredients.find(i => i._id === itemId);
    const list = ingredients
      .map(i => {
        if (i._id === itemId && i.type === BUN && i.count > 0) return i;
        if (increasedIngredient.type === BUN && i._id !== itemId && i.type === BUN) {
          return { ...i, count: 0 };
        };
        if (i._id === itemId) return { ...i, count: i.count + 1 };

        return i;
      });

    dispatch({ type: INCREASE_INGREDIENT_COUNT, payload: list });
  }
}

export function decreaseIngredientCount(itemId) {
  return (dispatch, getState) => {
    const list = [...getState().ingredients.ingredients]
      .map(i => {
        if (i._id === itemId) return {...i, count: i.count - 1};
        return i;
      });

    dispatch({ type: DECREASE_INGREDIENT_COUNT, payload: list });
  }
}

export function resetIngredientsCount() {
  return (dispatch, getState) => {
    const list = [...getState().ingredients.ingredients]
      .map(i => {
        return { ...i, count: 0 }
      });

    dispatch({ type: RESET_INGREDIENTS_COUNT, payload: list })
  }
}
