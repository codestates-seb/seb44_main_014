import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    memberId: null,
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.memberId = action.payload.memberId;
      state.isLogin = action.payload.isLogin;
    },
    logout: (state) => {
      state.memberId = null;
      state.isLogin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
