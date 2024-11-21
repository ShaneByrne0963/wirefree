import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultScreenSizes } from "../../context";

interface PageState {
  screenSizes: string[];
  pages: Page[];
  selectedPage: number;
  dropdown: boolean;
}

const initialState:PageState = {
  screenSizes: [defaultScreenSizes[0].name],
  pages: [{name: "Index", data: { [defaultScreenSizes[0].name]: {} }}],
  selectedPage: 0,
  dropdown: false
}

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    createPage(state, action: PayloadAction<string>) {
      // Add the data object, which includes all screen sizes
      let dataObject: Record<string, object> = {};
      state.screenSizes.map(screenSize => dataObject[screenSize] = {});

      // Create the new page
      const newPage = {
        name: action.payload,
        data: dataObject
      };
      console.log(newPage);

      // Add the page to the list of pages
      state.pages.push(newPage);
      state.selectedPage = state.pages.length - 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.selectedPage = action.payload;
    },
    renamePage(state, action: PayloadAction<[index: number, value:string]>) {
      const payload = action.payload;
      state.pages[payload[0]].name = payload[1];
    },
    addScreenSizeToPages(state, action: PayloadAction<string>) {
      state.screenSizes.push(action.payload);
      for (let page of state.pages) {
        page.data[action.payload] = {};
      }
    },
    deletePage(state, action: PayloadAction<number>) {
      state.pages.splice(action.payload, 1);
      if (state.selectedPage === state.pages.length) {
        state.selectedPage--;
      }
    }
  }
})

export type Page = {
  name: string;
  data: Record<string, object>;
}
export const { createPage, setPage, renamePage, addScreenSizeToPages, deletePage } = pageSlice.actions;
export default pageSlice.reducer;