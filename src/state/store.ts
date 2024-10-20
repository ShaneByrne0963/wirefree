import { configureStore } from "@reduxjs/toolkit";
import windowReducer from './window/WindowSlice.ts'

export const store = configureStore({
  reducer: {
    window: windowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
