'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginCompeleted: (state, action) => {
      state.currentUser = action.payload
    },
    logoutCompeleted: (state ,action) => {
      state.currentUser = null
    },
  },
});

export const { loginCompeleted , logoutCompeleted } = userSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectUser = (state) => state.user.currentUser;

export default userSlice.reducer;