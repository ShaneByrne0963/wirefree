import { createSlice } from "@reduxjs/toolkit";

interface WindowState {
  type: string;
};

const initialState: WindowState = {
  type: ""
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setWindow: (state) => {
      state.type = "Add Screen Size";
    },
    closeWindow: (state) => {
      state.type = "";
    },
  }
});

export const { setWindow, closeWindow } = windowSlice.actions;

export default windowSlice.reducer;