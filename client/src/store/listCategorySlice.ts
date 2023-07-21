import { createSlice } from '@reduxjs/toolkit';

export interface ICategoryState {
  category: {
    value: string;
  };
}

export const listCategorySlice = createSlice({
  name: 'listCategorySlice',
  initialState: {
    value: 'EATING',
  },
  reducers: {
    category: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { category } = listCategorySlice.actions;
