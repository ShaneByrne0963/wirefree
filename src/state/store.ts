import { configureStore } from "@reduxjs/toolkit";
import windowReducer from './window/windowSlice.ts'
import screenSizeReducer from './screenSize/screenSizeSlice.ts'

export const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
    window: windowReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
