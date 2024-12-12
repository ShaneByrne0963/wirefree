import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuProps {
  items: string[];
  x: number;
  y: number;
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
    openMenu(state, action: PayloadAction<MenuProps>) {
      state.menus.push(action.payload);
    },
    closeMenu(state, action:PayloadAction<number>) {
      state.menus.splice(action.payload, 1);
    }
  }
});

export const { openMenu, closeMenu } = menuSlice.actions;

export default menuSlice.reducer;