import { BASE_URL, INGREDIENTS } from '../../utils/constants';
import { checkResponse } from '../../utils/utils';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT';
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT';

const addCountInIngredient = (data) => {
  data.forEach(i => i.count = 0);
  return { type: GET_INGREDIENTS_SUCCESS, payload: data }
}

export function getIngredients() {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetch(`${BASE_URL}${INGREDIENTS}`)
      .then(checkResponse)
      .then(json => dispatch(addCountInIngredient(json.data)))
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_INGREDIENTS_FAILED })
      });
  }
}
