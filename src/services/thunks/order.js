import {
  isOrderEmptyAction,
  sendOrderFailedAction,
  sendOrderRequestAction,
  sendOrderSuccessAction,
} from '../actions';
import { orderFetch } from '../../utils/api';

export function sendOrder(ids, token) {
  return function (dispatch) {
    if (!ids.length) return dispatch(isOrderEmptyAction());
    dispatch(sendOrderRequestAction());
    orderFetch(ids, token)
      .then((data) => dispatch(sendOrderSuccessAction(data)))
      .catch((err) => {
        console.log(err);
        dispatch(sendOrderFailedAction());
      });
  };
}
