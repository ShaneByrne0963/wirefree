import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { confirmActions } from "../../components/window/WindowMessage";

export interface WindowState {
  active?: boolean;
  label: string;
  width: number;
  collapsedWidth?: number;
};

interface WindowListState {
  windows: (WindowState | ConfirmActionState)[];
};

export type WindowMessageState = (WindowState & WindowMessageProps);
export type ConfirmActionState = (WindowState & ConfirmActionProps);

export interface WindowMessageProps {
  label: string;
  bodyText: string|string[];
}

export interface ConfirmActionProps extends WindowMessageProps {
  buttonText: string;
  action: keyof typeof confirmActions;
  parameter?: any;
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
  gridSettings: <WindowState> {
    label: "Grid Settings",
    width: 400
  },
  showMessage: <WindowMessageState> {
    label: "Message",
    width: 600,
    collapsedWidth: 300,
    bodyText: ""
  },
  confirmAction: <ConfirmActionState> {
    label: "Confirm Action",
    width: 600,
    collapsedWidth: 300,
    bodyText: "",
    buttonText: "",
    action: "deletePage"
  }
};

const initialState: WindowListState = {
  windows: []
};

function findWindowIndexFromLabel(windows: (WindowState | WindowMessageState | ConfirmActionState)[], label: string) {
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
    showMessage(state, action: PayloadAction<WindowMessageProps>) {
      let newWindowProps = {...windowProperties.showMessage, ...action.payload};
      state.windows.push(newWindowProps);
    },
    confirmAction(state, action: PayloadAction<ConfirmActionProps>) {
      let newWindowProps = {...windowProperties.confirmAction, ...action.payload};
      state.windows.push(newWindowProps);
    },
  }
});

export const { addWindow, setWindowActive, closeWindow, showMessage, confirmAction } = windowSlice.actions;

export default windowSlice.reducer;