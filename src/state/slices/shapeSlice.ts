import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface shapeState {
  selected: string;
  color1: string;
  color2: string;
}

const initialState:shapeState = {
  selected: "",
  color1: "rgb(117, 117, 117)",
  color2: "rgb(255, 255, 255)",
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
    setColor(state, action:PayloadAction<[number, string]>) {
      if (action.payload[0] === 1) {
        state.color1 = action.payload[1];
      }
      else {
        state.color2 = action.payload[1];
      }
    }
  }
});

export const { selectShape, deselectShape, setColor } = shapeSlice.actions;

export default shapeSlice.reducer;