import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultScreenSizes } from "../../context";

interface PageState {
  screenSizes: string[];
  pages: Page[];
  selectedPage: number;
  dropdown: boolean;
}

// Every page starts with one layer
const defaultLayerData = {
  "layers": ["Layer 1"],
  "_Layer 1": {}
}

const initialState:PageState = {
  screenSizes: [defaultScreenSizes[0].name],
  pages: [{name: "Index", data: { [defaultScreenSizes[0].name]: {...defaultLayerData} }}],
  selectedPage: 0,
  dropdown: false
}

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    createPage(state, action: PayloadAction<string>) {
      // Add the data object, which includes all screen sizes
      let dataObject: Record<string, any> = {};
      state.screenSizes.map(screenSize => dataObject[screenSize] = {...defaultLayerData});

      // Create the new page
      const newPage = {
        name: action.payload,
        data: dataObject
      };

      // Add the page to the list of pages
      state.pages.push(newPage);
      state.selectedPage = state.pages.length - 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.selectedPage = action.payload;
    },
    renamePage(state, action: PayloadAction<[number, string]>) {
      const payload = action.payload;
      state.pages[payload[0]].name = payload[1];
    },
    addScreenSizeToPages(state, action: PayloadAction<string>) {
      state.screenSizes.push(action.payload);
      for (let page of state.pages) {
        page.data[action.payload] = {...defaultLayerData};
      }
    },
    addLayerToPage(state, action: PayloadAction<{index: number, selectedScreen: string, layer: string}>) {
      const {index, selectedScreen, layer} = action.payload;
      let pageData = state.pages[index].data[selectedScreen];
      pageData.layers.push(layer);
      pageData[`_${layer}`] = {};
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
  data: Record<string, any>;
}
export const {
  createPage,
  setPage,
  renamePage,
  addScreenSizeToPages,
  addLayerToPage,
  deletePage
} = pageSlice.actions;
export default pageSlice.reducer;