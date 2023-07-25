import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
  user: {
    memberId: number | null;
    isLogin: boolean;
    email: string | null;
    foodTagId: number | null;
  };
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    memberId: null,
    isLogin: false,
    email: '',
    foodTagId: null,
  },
  reducers: {
    login: (state, action) => {
      state.memberId = action.payload.memberId;
      state.isLogin = action.payload.isLogin;
      state.email = action.payload.email;
      state.foodTagId = action.payload.foodTagId;
    },
    foodTagChange: (state, action) => {
      state.foodTagId = action.payload.foodTagId;
    },
    logout: (state, action) => {
      state.memberId = action.payload.memberId;
      state.isLogin = action.payload.isLogin;
      state.email = action.payload.email;
      state.foodTagId = action.payload.foodTagId;
    },
  },
});

export const { login, foodTagChange, logout } = userSlice.actions;
