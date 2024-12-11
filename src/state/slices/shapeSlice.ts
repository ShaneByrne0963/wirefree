import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axis } from "../../context";

export type gridUnits = "px" | "%" | "cells";

interface shapeState {
  selectedTool: string;
  selectedShapes: string[];
  color1: string;
  color2: string;
  grid: { enabled: boolean, width: number, widthUnits: gridUnits, height: number, heightUnits: gridUnits };
}

const initialState:shapeState = {
  selectedTool: "",
  selectedShapes: [],
  color1: "rgb(117, 117, 117)",
  color2: "rgb(255, 255, 255)",
  grid: {
    enabled: true,
    width: 32,
    widthUnits: "px",
    height: 32,
    heightUnits: "px",
  }
}

const shapeSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    selectShapeTool(state, action:PayloadAction<string>) {
      state.selectedTool = action.payload;
    },
    deselectShapeTool(state) {
      state.selectedTool = "";
    },
    selectShape(state, action:PayloadAction<string>) {
      state.selectedShapes.push(action.payload);
    },
    deselectShape(state, action:PayloadAction<string>) {
      const index = state.selectedShapes.indexOf(action.payload);
      if (index >= 0) {
        state.selectedShapes.splice(index, 1);
      }
    },
    deselectAllShapes(state) {
      state.selectedShapes = [];
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
    },
    setGridProperty(state, action:PayloadAction<{ axis: Axis, value: number, units: gridUnits }>) {
      if (action.payload.axis === "x") {
        state.grid.width = action.payload.value;
        state.grid.widthUnits = action.payload.units;
      }
      else {
        state.grid.height = action.payload.value;
        state.grid.heightUnits = action.payload.units;
      }
    }
  }
});

export const {
  selectShapeTool,
  deselectShapeTool,
  selectShape,
  deselectShape,
  deselectAllShapes,
  setColor,
  setGridStatus,
  setGridProperty
} = shapeSlice.actions;

export default shapeSlice.reducer;