import { BASE_URL, INGREDIENTS_ENDPOINT } from '../../utils/constants';
import { checkResponse } from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
  return function(dispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    fetch(`${BASE_URL}${INGREDIENTS_ENDPOINT}`)
      .then(checkResponse)
      .then(json => dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: json.data }))
      .catch(err => {
        console.log(err);
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  }
}
