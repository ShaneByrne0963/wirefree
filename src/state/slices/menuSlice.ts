import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MenuProps {
  items: string[];
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
    }
  }
});

export const { openMenu } = menuSlice.actions;

export default menuSlice.reducer;