import { checkResponse, orderFetch } from '../../utils/utils';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const IS_EMPTY = 'IS_EMPTY';
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS';

export function sendOrder(ids) {
  if (!ids.length) return { type: IS_EMPTY }
  return function(dispatch) {
    dispatch({ type: SEND_ORDER_REQUEST });
    orderFetch(ids)
      .then(checkResponse)
      .then(data => dispatch({ type: SEND_ORDER_SUCCESS, payload: data }))
      .catch(err => {
        console.log(err);
        dispatch({ type: SEND_ORDER_FAILED });
      })
  }
}
