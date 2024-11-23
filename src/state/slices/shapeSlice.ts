import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface shapeState {
  selected: string;
}

const initialState:shapeState = {
  selected: ""
}

const shapeSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    selectShape(state, action:PayloadAction<string>) {
      state.selected = action.payload;
    },
    deselectShape(state) {
      state.selected = "";
    },
  }
});

export const { selectShape, deselectShape } = shapeSlice.actions;

export default shapeSlice.reducer;