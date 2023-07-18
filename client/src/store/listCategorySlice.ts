import { createSlice } from '@reduxjs/toolkit';

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
