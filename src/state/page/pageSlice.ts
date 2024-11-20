import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  pages: Page[];
  selectedPage: number;
  dropdown: boolean;
}

const initialState:PageState = {
  pages: [{name: "Index"}],
  selectedPage: 0,
  dropdown: false
}

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    createPage(state, action: PayloadAction<{name: string}>) {
      state.pages.push(action.payload);
      state.selectedPage = state.pages.length - 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.selectedPage = action.payload;
    },
    renamePage(state, action: PayloadAction<[index: number, value:string]>) {
      const payload = action.payload;
      state.pages[payload[0]].name = payload[1];
    }
  }
})

export type Page = {
  name: string;
}
export const { createPage, setPage, renamePage } = pageSlice.actions;
export default pageSlice.reducer;