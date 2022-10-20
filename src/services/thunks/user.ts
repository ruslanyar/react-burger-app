import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';

import { checkResponse, fetchAuth, fetchWithRefresh } from '../../utils/api';
import {
  BASE_URL,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTRATION_ENDPOINT,
  USER_ENDPOINT,
} from '../../utils/constants';
import { getCookie, saveTokens } from '../../utils/utils';
import {
  IAuthResponse,
  ILogOut,
  IUser,
} from '../types/data';

export const registerUser = createAsyncThunk<
  IUser,
  any,
  { rejectValue: string }
>('user/registerUser', async (body, { rejectWithValue }) => {
  try {
    const response = await fetchAuth(REGISTRATION_ENDPOINT, body);
    const data: IAuthResponse = await checkResponse(response);
    const {user, accessToken, refreshToken} = data;
    saveTokens({ accessToken, refreshToken });
    return user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logInUser = createAsyncThunk<
  IUser,
  any,
  { rejectValue: string }
>('user/logInUser', async (body, { rejectWithValue }) => {
  try {
    const response = await fetchAuth(LOGIN_ENDPOINT, body);
    const data: IAuthResponse = await checkResponse(response);
    const {user, accessToken, refreshToken} = data;
    saveTokens({ accessToken, refreshToken });
    return user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logOutUser = createAsyncThunk<
  ILogOut,
  void,
  { rejectValue: string }
>('user/logOutUser', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('refreshToken');
    const response = await fetchAuth(LOGOUT_ENDPOINT, { token });
    const data = await checkResponse(response);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const getUserInfo = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>('user/getUserInfo', async (_, { rejectWithValue }) => {
  try {
    const accessToken = getCookie('token');
    const response = await fetchWithRefresh(`${BASE_URL}/${USER_ENDPOINT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await checkResponse(response);
    return data.user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateUserInfo = createAsyncThunk<
  IUser,
  { body: object; setFn: React.Dispatch<React.SetStateAction<boolean>> },
  { rejectValue: string }
>('user/updateUserInfo', async ({ body, setFn }, { rejectWithValue }) => {
  try {
    const accessToken = getCookie('token');
    const response = await fetchWithRefresh(`${BASE_URL}/${USER_ENDPOINT}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data = await checkResponse(response);
    return data.user;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
