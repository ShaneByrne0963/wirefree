import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultScreenSizes } from "../../context";
import { ShapeProps, ShapeStyles } from "../../components/canvas/CanvasShape";
import { ShapeHtmlProps } from "../../shapes";

export interface PageState {
  screenSizes: string[];
  pages: Page[];
  persistentLayers: Record<string, any>;
  selectedPage: number;
  selectedScreen: string;
  dropdown: boolean;
}

// Every page starts with one layer
const defaultLayerData = {
  layers: ["*Base Layer", "_Layer 1"], // We also store the layer names in an array to allow for custom ordering
  selected: 1,
  "*Base Layer_visible": true,
  "_Layer 1": {
    visible: true,
    shapes: [],
  }
}

interface updateStyleProps {
  styles?: Partial<ShapeStyles>,
  props?: Partial<ShapeHtmlProps>,
}

const initialState:PageState = {
  screenSizes: [defaultScreenSizes[0].name],
  pages: [{name: "Index", data: {[defaultScreenSizes[0].name]: {...defaultLayerData}}}],
  persistentLayers: {
    [defaultScreenSizes[0].name]: {"*Base Layer": []}
  },
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
      // Adding the base layer to the new screen
      state.persistentLayers[action.payload] = {"*Base Layer": []};
      state.selectedScreen = action.payload;
    },
    updatePageSelectedScreen(state, action: PayloadAction<string>) {
      state.selectedScreen = action.payload;
    },
    addLayerToPage(state, action: PayloadAction<string>) {
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      pageData.layers.push(action.payload);
      pageData[action.payload] = { visible: true, shapes: [] };
      pageData.selected = pageData.layers.length - 1;
    },
    selectLayer(state, action: PayloadAction<number>) {
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      pageData.selected = action.payload;
    },
    toggleLayerVisibility(state, action: PayloadAction<number>) {
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      let layerName = pageData.layers[action.payload];

      // Determine if the layer is regular or persistent
      if (layerName[0] === "_") {
        pageData[layerName].visible = !pageData[layerName].visible;
      }
      else {
        pageData[`${layerName}_visible`] = !pageData[`${layerName}_visible`];
      }
    },
    addShape(state, action: PayloadAction<ShapeProps>) {
      // Find the layer to add the shape to
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      const layerName = pageData.layers[pageData.selected];

      // Determine where the layer stores their shapes. Persistent layers store them at a higher level
      let shapeData = layerName[0] === "_" ? pageData[layerName].shapes : state.persistentLayers[state.selectedScreen][layerName];
      shapeData.push(action.payload);
    },
    updateShape(state, action: PayloadAction<[layer: string, index: number, value: updateStyleProps]>) {
      const [layer, index, value] = action.payload;
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      let shapeData = layer[0] === "_" ? pageData[layer].shapes[index] : state.persistentLayers[state.selectedScreen][layer][index];

      // Combining the new properties with the old
      const updatedProps = {
        styles: { ...shapeData.styles, ...value.styles },
        props: { ...shapeData.props, ...value.props }
      };

      // Setting the new properties in the store
      if (layer[0] === "_") {
        pageData[layer].shapes[index] = updatedProps;
      }
      else {
        state.persistentLayers[state.selectedScreen][layer][index] = updatedProps;
      }
    },
    deleteShape(state, action: PayloadAction<[layer: string, index: number]>) {
      const [layer, index] = action.payload;
      let pageData = state.pages[state.selectedPage].data[state.selectedScreen];
      if (layer[0] === "_") {
        pageData[layer].shapes.splice(index, 1);
      }
      else {
        state.persistentLayers[state.selectedScreen][layer].splice(index, 1);
      }
    },
    deletePage(state, action: PayloadAction<number>) {
      state.pages.splice(action.payload, 1);
      if (state.selectedPage === state.pages.length) {
        state.selectedPage--;
      }
    },
    setPageSlice(state, action:PayloadAction<PageState>) {
      // Just to keep the compiler happy
      state;
      return action.payload;
    },
    resetPageSlice: () => initialState,
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
  toggleLayerVisibility,
  addShape,
  updateShape,
  deleteShape,
  deletePage,
  setPageSlice,
  resetPageSlice
} = pageSlice.actions;
export default pageSlice.reducer;