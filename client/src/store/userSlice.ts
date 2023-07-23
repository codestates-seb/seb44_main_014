import { createSlice } from '@reduxjs/toolkit';

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
    logout: (state, action) => {
      state.memberId = action.payload.memberId;
      state.isLogin = action.payload.isLogin;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout } = userSlice.actions;
