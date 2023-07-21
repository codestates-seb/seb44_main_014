import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
  user: {
    memberId: number | null;
    isLogin: boolean;
    email: string | null;
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    memberId: null,
    isLogin: false,
    email: '',
  },
  reducers: {
    login: (state, action) => {
      state.memberId = action.payload.memberId;
      state.isLogin = action.payload.isLogin;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.memberId = null;
      state.isLogin = false;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
