import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultScreenSizes } from "../../context";

interface PageState {
  screenSizes: string[];
  pages: Page[];
  selectedPage: number;
  selectedScreen: string;
  dropdown: boolean;
}

// Every page starts with one layer
const defaultLayerData = {
  "layers": ["Layer 1"], // We also store the layer names in an array to allow for custom ordering
  "selected": 0,
  "_Layer 1": {
    visible: true
  }
}

const initialState:PageState = {
  screenSizes: [defaultScreenSizes[0].name],
  pages: [{name: "Index", data: { [defaultScreenSizes[0].name]: {...defaultLayerData} }}],
  selectedPage: 0,
  selectedScreen: defaultScreenSizes[0].name,
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
    duplicatePage(state, action: PayloadAction<[number, string]>) {
      const copiedData = {...state.pages[action.payload[0]].data};
      const newPage = {
        name: action.payload[1],
        data: copiedData
      };
      state.pages.push(newPage);
      state.selectedPage = state.pages.length - 1;
    },
    addScreenSizeToPages(state, action: PayloadAction<string>) {
      state.screenSizes.push(action.payload);
      for (let page of state.pages) {
        page.data[action.payload] = {...defaultLayerData};
      }
      state.selectedScreen = action.payload;
    },
    updatePageSelectedScreen(state, action: PayloadAction<string>) {
      state.selectedScreen = action.payload;
    },
    addLayerToPage(state, action: PayloadAction<string>) {
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      pageData.layers.push(action.payload);
      pageData[`_${action.payload}`] = {};
      pageData.selected = pageData.layers.length - 1;
    },
    selectLayer(state, action: PayloadAction<number>) {
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      pageData.selected = action.payload;
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
  duplicatePage,
  addScreenSizeToPages,
  updatePageSelectedScreen,
  addLayerToPage,
  selectLayer,
  deletePage
} = pageSlice.actions;
export default pageSlice.reducer;