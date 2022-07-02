import { BASE_URL, INGREDIENTS_ENDPOINT } from '../../utils/constants';
import { checkResponse } from '../../utils/api';
import {
  getIngredientsFailedAction,
  getIngredientsRequestAction,
  getIngredientsSuccessAction,
} from '../actions';
import { AppDispatch, AppThunk } from '../types';

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequestAction());
    fetch(`${BASE_URL}${INGREDIENTS_ENDPOINT}`)
      .then(checkResponse)
      .then((json) => dispatch(getIngredientsSuccessAction(json.data)))
      .catch((err) => {
        console.log(err);
        dispatch(getIngredientsFailedAction());
      });
  };
}
