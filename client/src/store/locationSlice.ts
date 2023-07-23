import { createSlice } from '@reduxjs/toolkit';

export interface ILocationState {
  location: {
    locationId: string | null;
  };
}

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
