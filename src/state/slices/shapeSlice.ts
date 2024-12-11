import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type gridUnits = "px" | "%" | "cells";

interface shapeState {
  selected: string;
  color1: string;
  color2: string;
  grid: { enabled: boolean, width: number, widthUnits: gridUnits, height: number, heightUnits: gridUnits };
}

const initialState:shapeState = {
  selected: "",
  color1: "rgb(117, 117, 117)",
  color2: "rgb(255, 255, 255)",
  grid: {
    enabled: true,
    width: 3,
    widthUnits: "cells",
    height: 10,
    heightUnits: "%",
  }
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
    },
    setGridStatus(state, action:PayloadAction<boolean>) {
      state.grid.enabled = action.payload;
    }
  }
});

export const { selectShape, deselectShape, setColor, setGridStatus } = shapeSlice.actions;

export default shapeSlice.reducer;