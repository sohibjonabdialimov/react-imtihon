import { configureStore } from "@reduxjs/toolkit";
import { tokenReducer } from "./token/token.slice";
import { userReducer } from "./users/users.slice";


export const store = configureStore({
  reducer: {
    token: tokenReducer,
    users: userReducer
  }
})