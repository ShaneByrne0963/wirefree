import { configureStore } from "@reduxjs/toolkit";
import windowReducer from './window/windowSlice.ts'
import screenSizeReducer from './screen_size/screenSizeSlice.ts'
import pageReducer from './page/pageSlice.ts'

export const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
    window: windowReducer,
    pages: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
