import { createSlice } from '@reduxjs/toolkit';

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locationId: null,
  },
  reducers: {
    locationPost: (state, action) => {
      state.locationId = action.payload.locationId;
    },
    locationLogout: (state, action) => {
      state.locationId = action.payload.locationId;
    },
  },
});

export const { locationPost, locationLogout } = locationSlice.actions;
