import { configureStore } from "@reduxjs/toolkit";
import graphReducer from "./graphSlice.js";
import { useDispatch } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    graph: graphReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
