import {
  isOrderEmpty,
  sendOrderFailed,
  sendOrderRequest,
  sendOrderSuccess,
} from '../actions';
import { orderFetch } from '../../utils/api';

export function sendOrder(ids, token) {
  return function (dispatch) {
    if (!ids.length) return dispatch(isOrderEmpty());
    dispatch(sendOrderRequest());
    orderFetch(ids, token)
      .then((data) => dispatch(sendOrderSuccess(data)))
      .catch((err) => {
        console.log(err);
        dispatch(sendOrderFailed());
      });
  };
}
