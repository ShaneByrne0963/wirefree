import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultScreenSizes } from "../../context";

interface ScreenSizeState {
  activeScreens: {
    name: string;
    width: number;
    height: number;
  }[];
};

const initialState: ScreenSizeState = {
  activeScreens: [defaultScreenSizes[0]]
};

const screenSizeSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    addDefaultScreenSize: (state, action: PayloadAction<string>) => {
      for (let defaultScreen of defaultScreenSizes) {
        if (action.payload === defaultScreen.name) {
          state.activeScreens.push(defaultScreen);
          break;
        }
      }
    },
  }
});

export const { addDefaultScreenSize } = screenSizeSlice.actions;

export default screenSizeSlice.reducer;