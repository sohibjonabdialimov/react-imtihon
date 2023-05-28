import { createSlice } from "@reduxjs/toolkit";


export const {actions: tokenActions, reducer: tokenReducer} = createSlice({
  name: "token",
  initialState: {
    token: null
  },
  reducers: {
    setToken(state, action){
      state.token = action.payload.accessToken;
      if(state.token){
        localStorage.setItem("token", state.token);
      }
    }
  }
})