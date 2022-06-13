import {
  USER_GET_USER_REQUEST,
  USER_GET_USER_SUCCESS,
  USER_REGISTRATION,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_UPDATE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../action-types';

export const getUserRequest = () => {
  return {
    type: USER_GET_USER_REQUEST,
  };
};

export const getUserSuccess = (payload) => {
  return {
    type: USER_GET_USER_SUCCESS,
    payload,
  };
};

export const signInUser = (payload) => {
  return {
    type: USER_SIGN_IN,
    payload,
  };
};

export const signOutUser = () => {
  return {
    type: USER_SIGN_OUT,
  };
};

export const registrationUser = (payload) => {
  return {
    type: USER_REGISTRATION,
    payload,
  };
};

export const updateUserInfo = (payload) => {
  return {
    type: USER_UPDATE,
    payload,
  };
};

export const userUpdateRequest = () => {
  return {
    type: USER_UPDATE_REQUEST,
  };
};

export const userUpdateSuccess = (payload) => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload,
  };
};
