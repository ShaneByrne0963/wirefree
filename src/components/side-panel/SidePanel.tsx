import PageName from "./pages/PageName";
import SidePanelSection from "./SidePanelSection";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { addLayerToPage } from "../../state/slices/pageSlice";
import ShapeGroups from "./shapes/ShapeGroups";

function SidePanel() {
  const screenSizeData = useSelector((state: RootState) => state.screenSize);
  const pageData = useSelector((state: RootState) => state.pages);
  const [shapeGroup, setShapeGroup] = useState(1);
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
          `_Layer ${layerCount}`
        ) ||
        currentPageData[selectedScreenName].layers.includes(
          `*Layer ${layerCount}`
        )
      ) {
        layerCount++;
      }
      dispatch(addLayerToPage(`_Layer ${layerCount}`));
    }
  }

  const color = useContext(ThemeContext);
  return (
    <div id="side-panel" className={color + " lighten-3"}>
      <PageName></PageName>
      <SidePanelSection
        sectionType="controls"
        label="Controls"
      ></SidePanelSection>
      <SidePanelSection
        sectionType="shapes"
        label="Shapes"
        selectedIndex={shapeGroup}
      ></SidePanelSection>
      <ShapeGroups
        selectedGroup={shapeGroup}
        handleChangeGroup={setShapeGroup}
      ></ShapeGroups>
      <SidePanelSection
        sectionType="layers"
        label="Layers"
        labelButton="add"
        labelButtonAction={handleAddLayer}
      ></SidePanelSection>
      <SidePanelSection
        sectionType="screen"
        label="Screen"
        canOverflow={true}
      ></SidePanelSection>
    </div>
  );
}

export default SidePanel;
