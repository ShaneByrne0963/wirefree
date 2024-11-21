import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WindowState {
  active?: boolean;
  label: string;
  width: number;
  collapsedWidth?: number;
};

interface WindowListState {
  windows: WindowState[];
}

const windowProperties = {
  addScreenSize: <WindowState> {
    label: "Add Screen Size",
    width: 600,
    collapsedWidth: 400
  },
  pageSettings: <WindowState> {
    label: "Page Settings",
    width: 400
  }
}

const initialState: WindowListState = {
  windows: []
}

function findWindowIndexFromLabel(windows: WindowState[], label: string) {
  for (let i = 0; i < windows.length; i++) {
    const window = windows[i];
    if (window.label === label) {
      return i;
    }
  }
  return -1;
}

const windowSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    addWindow: (state, action: PayloadAction<string>) => {
      let newWindowProps = {...windowProperties[action.payload as keyof typeof windowProperties]};
      newWindowProps.active = false;
      state.windows.push(newWindowProps);
    },
    setWindowActive(state, action: PayloadAction<[string, boolean]>) {
      const foundIndex = findWindowIndexFromLabel(state.windows, action.payload[0]);
      if (foundIndex >= 0) {
        state.windows[foundIndex].active = action.payload[1];
      }
    },
    closeWindow: (state, action: PayloadAction<string>) => {
      const foundIndex = findWindowIndexFromLabel(state.windows, action.payload);
      if (foundIndex >= 0) {
        state.windows.splice(foundIndex, 1);
      }
    },
  }
});

export const { addWindow, setWindowActive, closeWindow } = windowSlice.actions;

export default windowSlice.reducer;