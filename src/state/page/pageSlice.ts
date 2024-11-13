import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  pages: Page[];
  selectedPage: number;
}

const initialState:PageState = {
  pages: [{name: "index"}],
  selectedPage: 0
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
    }
  }
})

export type Page = {
  name: string;
}
export const { createPage, setPage } = pageSlice.actions;
export default pageSlice.reducer;