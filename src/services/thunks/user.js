import { fetchAuth, fetchWithRefresh } from '../../utils/api';
import {
  BASE_URL,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTRATION_ENDPOINT,
  USER_ENDPOINT,
} from '../../utils/constants';
import { getCookie, saveTokens } from '../../utils/utils';
import { getUserRequestAction, getUserSuccessAction, registrationUserAction, signInUserAction, signOutUserAction, userUpdateRequestAction, userUpdateSuccessAction } from '../actions';

export function registerUser(body) {
  return function (dispatch) {
    fetchAuth(REGISTRATION_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch(registrationUserAction(data.user));
        }
        return data;
      })
      .then(saveTokens)
      .catch((err) => console.log(err));
  };
}

export function signInUserThunk(body) {
  return function (dispatch) {
    fetchAuth(LOGIN_ENDPOINT, body)
      .then((data) => {
        if (data.success) {
          dispatch(signInUserAction(data.user));
        }
        return data;
      })
      .then(saveTokens)
      .catch((err) => console.log(err));
  };
}

export function signOutUserThunk() {
  const refreshToken = localStorage.getItem('refreshToken');
  return function (dispatch) {
    fetchAuth(LOGOUT_ENDPOINT, { token: refreshToken })
      .then((data) => {
        if (data.success) {
          dispatch(signOutUserAction());
        }
      })
      .catch((err) => console.log(err));
  };
}

export function getUserInfo() {
  const accessToken = getCookie('token');
  return function (dispatch) {
    dispatch(getUserRequestAction());
    fetchWithRefresh(`${BASE_URL}${USER_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => {
        if (data.success) {
          dispatch(getUserSuccessAction(data.user));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateUserInfoThunk(body, setFn) {
  const accessToken = getCookie('token');
  return function (dispatch) {
    dispatch(userUpdateRequestAction());
    fetchWithRefresh(`${BASE_URL}${USER_ENDPOINT}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        if (data.success) {
          dispatch(userUpdateSuccessAction(data.user));
        }
      })
      .then(() => setFn(false))
      .catch((err) => {
        console.log(err);
      });
  };
}
