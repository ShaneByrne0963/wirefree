import { createSlice } from "@reduxjs/toolkit";

interface WindowState {
  type: string
};

const initialState: WindowState = {
  type: ""
};

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
  }
});

export default windowSlice.reducer;