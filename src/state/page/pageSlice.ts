import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  pages: Page[];
}

const initialState:PageState = {
  pages: [{name: "index"}]
}

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    createPage(state, action: PayloadAction<{name: string}>) {
      state.pages.push(action.payload);
    }
  }
})

export type Page = {
  name: string;
}
export const { createPage } = pageSlice.actions;
export default pageSlice.reducer;