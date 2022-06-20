import { BASE_URL, INGREDIENTS_ENDPOINT } from '../../utils/constants';
import { checkResponse } from '../../utils/api';
import {
  getIngredientsFailed,
  getIngredientsRequest,
  getIngredientsSuccess,
} from '../actions';

export function getIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    fetch(`${BASE_URL}${INGREDIENTS_ENDPOINT}`)
      .then(checkResponse)
      .then((json) => dispatch(getIngredientsSuccess(json.data)))
      .catch((err) => {
        console.log(err);
        dispatch(getIngredientsFailed());
      });
  };
}
