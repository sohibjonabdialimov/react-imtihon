import { createSlice } from "@reduxjs/toolkit";

export const {actions: userActions, reducer: userReducer} = createSlice({
  name: "users",
  initialState: {
    users: []
  },
  reducers: {
    setUsers(state, action){
      state.users = action.payload;
    }
  }
})
