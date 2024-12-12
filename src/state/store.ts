import { configureStore } from "@reduxjs/toolkit";
import windowReducer from './slices/windowSlice.ts';
import screenSizeReducer from './slices/screenSizeSlice.ts';
import pageReducer from './slices/pageSlice.ts';
import shapeReducer from './slices/shapeSlice.ts';
import menuReducer from './slices/menuSlice.ts';

export const store = configureStore({
  reducer: {
    screenSize: screenSizeReducer,
    window: windowReducer,
    pages: pageReducer,
    shapes: shapeReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
