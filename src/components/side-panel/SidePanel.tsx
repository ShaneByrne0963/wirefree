import PageName from "./pages/PageName";
import SidePanelSection from "./SidePanelSection";
import ShapePalette from "./ShapePalette";
import { useContext } from "react";
import { ThemeContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { addLayerToPage } from "../../state/page/pageSlice";

function SidePanel() {
  const screenSizeData = useSelector((state: RootState) => state.screenSize);
  const pageData = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch();

  // Function for adding layers to the selected page
  function handleAddLayer() {
    const selectedScreenName =
      screenSizeData.activeScreens[screenSizeData.selectedScreen].name;
    const currentPageData = pageData.pages[pageData.selectedPage].data;

    if (selectedScreenName in currentPageData) {
      // Find the name of the new layer
      let layerCount = 1;
      while (
        currentPageData[selectedScreenName].layers.includes(
          `Layer ${layerCount}`
        )
      ) {
        layerCount++;
      }
      dispatch(
        addLayerToPage({
          index: pageData.selectedPage,
          selectedScreen: selectedScreenName,
          layer: `Layer ${layerCount}`,
        })
      );
    }
  }

  const color = useContext(ThemeContext);
  return (
    <div id="side-panel" className={color + " lighten-3"}>
      <PageName></PageName>
      <SidePanelSection
        sectionType="screen"
        label="Screen"
        canOverflow={true}
      ></SidePanelSection>
      <SidePanelSection
        sectionType="layers"
        label="Layers"
        labelButton="add"
        labelButtonAction={handleAddLayer}
      ></SidePanelSection>
      <ShapePalette color={color}></ShapePalette>
    </div>
  );
}

export default SidePanel;
