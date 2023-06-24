import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reAuth } from "./auth";
import { reShrink } from "./shrink";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
    auth: reAuth,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
