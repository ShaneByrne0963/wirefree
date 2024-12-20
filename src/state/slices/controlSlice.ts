import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axis } from "../../context";

export type gridUnits = "px" | "%" | "cells";

export interface GridProps {
  enabled: boolean;
  width: number;
  widthUnits: gridUnits;
  height: number;
  heightUnits: gridUnits;
}

export interface ShapeState {
  selectedTool: string;
  shapeTool: string;
  selectedShapes: string[];
  color1: string;
  color2: string;
  grid: GridProps;
}

const initialState:ShapeState = {
  selectedTool: "",
  shapeTool: "Rectangle",
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

const controlSlice = createSlice({
  name: "shapes",
  initialState,
  reducers: {
    selectTool(state, action:PayloadAction<string>) {
      state.selectedTool = action.payload;
    },
    deselectTool(state) {
      state.selectedTool = "";
    },
    selectShapeTool(state, action:PayloadAction<string>) {
      state.shapeTool = action.payload;
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
    toggleGrid(state) {
      state.grid.enabled = !state.grid.enabled;
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
    },
    resetControlSlice: () => initialState
  }
});

export const {
  selectTool,
  deselectTool,
  selectShapeTool,
  selectShape,
  deselectShape,
  deselectAllShapes,
  setColor,
  setGridStatus,
  toggleGrid,
  setGridProperty,
  resetControlSlice
} = controlSlice.actions;

export default controlSlice.reducer;