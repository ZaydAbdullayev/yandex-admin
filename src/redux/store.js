import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reShrink } from "./shrink";

export const store = configureStore({
  reducer: combineReducers({
    shrink: reShrink,
  }),
  devTools: process.env.NODE_ENV !== "production",
});
