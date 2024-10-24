import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowState {
  active: boolean;
  label: string;
  width: number;
};

const initialState: WindowState = {
  active: false,
  label: "",
  width: 600,
};

const windowProperties = {
  addScreenSize: {
    label: "Add Screen Size",
    width: 800,
  }
}

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setWindow: (state, action: PayloadAction<string>) => {
      const newWindowProps = windowProperties[action.payload as keyof typeof windowProperties];
      state.label = newWindowProps.label;
      state.width = newWindowProps.width;
      state.active = true;
    },
    closeWindow: (state) => {
      state.active = false;
    },
  }
});

export const { setWindow, closeWindow } = windowSlice.actions;

export default windowSlice.reducer;