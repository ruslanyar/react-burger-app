import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getUserInfo, logInUser, logOutUser, registerUser, updateUserInfo } from '../thunks/user';

import { IUser } from '../types/data';

type TUserState = {
  isRequest: boolean;
  isAuth: boolean;
  user: IUser | null;
  error: string | null;
};

const initialState: TUserState = {
  isRequest: false,
  isAuth: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isRequest = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.isRequest = false;
        state.isAuth = false;
        state.user = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(isPending, (state) => {
        state.isRequest = true;
        state.error = null;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isRequest = false;
      })
  }
});

function isPending(action: AnyAction) {
  return action.type.endsWith('pending');
}

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
