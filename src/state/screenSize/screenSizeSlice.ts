import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultScreenSizes } from "../../context";

interface ScreenSizeState {
  activeScreens: ScreenSize[];
  selectedScreen: number;
};

const initialState: ScreenSizeState = {
  activeScreens: [defaultScreenSizes[0]],
  selectedScreen: 0
};

const screenSizeSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    selectScreenSize(state, action: PayloadAction<number>) {
      state.selectedScreen = action.payload;
    },
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

export type ScreenSize = {
  name: string;
  width: number;
  height: number;
}
export const { selectScreenSize, addDefaultScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;