import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WindowState {
  active?: boolean;
  label: string;
  width: number;
  collapsedWidth?: number;
};

interface WindowListState {
  windows: (WindowState | ConfirmActionState)[];
};

export interface ConfirmActionState {
  active?: boolean;
  label: string,
  width: number,
  collapsedWidth?: number;
  bodyText: string,
  buttonText: string,
  action: () => void
};

export interface ConfirmActionProps {
  label: string,
  bodyText: string,
  buttonText: string,
  action: () => void
};

const windowProperties = {
  addScreenSize: <WindowState> {
    label: "Add Screen Size",
    width: 600,
    collapsedWidth: 400
  },
  pageSettings: <WindowState> {
    label: "Page Settings",
    width: 400
  },
  confirmAction: <ConfirmActionState> {
    label: "Confirm Action",
    width: 600,
    collapsedWidth: 300,
    bodyText: "",
    buttonText: "",
    action: () => {return}
  }
};

const initialState: WindowListState = {
  windows: []
};

function findWindowIndexFromLabel(windows: (WindowState | ConfirmActionState)[], label: string) {
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
    confirmAction(state, action: PayloadAction<ConfirmActionProps>) {
      let newWindowProps = {...windowProperties.confirmAction, ...action.payload};
      state.windows.push(newWindowProps);
    }
  }
});

export const { addWindow, setWindowActive, closeWindow, confirmAction } = windowSlice.actions;

export default windowSlice.reducer;