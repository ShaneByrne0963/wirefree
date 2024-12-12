import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
  label: string;
  action: (...args: any[]) => any;
}

export interface MenuProps {
  items: (MenuItem | "divide")[];
}

interface menuState {
  menus: MenuProps[];
}

const initialState:menuState = {
  menus: [],
}

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    createMenu(state, action: PayloadAction<MenuProps>) {
      state.menus.push(action.payload);
    }
  }
});

export const { createMenu } = menuSlice.actions;

export default menuSlice.reducer;