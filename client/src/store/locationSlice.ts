import { createSlice } from '@reduxjs/toolkit';

export interface ILocationState {
  location: {
    locationId: string | null;
    address: string | null;
  };
}

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    locationId: null,
    address: null,
  },
  reducers: {
    locationPost: (state, action) => {
      state.locationId = action.payload.locationId;
      state.address = action.payload.address;
    },
    locationLogout: (state, action) => {
      state.locationId = action.payload.locationId;
      state.address = action.payload.address;
    },
  },
});

export const { locationPost, locationLogout } = locationSlice.actions;
