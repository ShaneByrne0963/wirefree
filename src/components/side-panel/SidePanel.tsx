import PageName from "./pages/PageName";
import SidePanelSection from "./SidePanelSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { addLayerToPage } from "../../state/slices/pageSlice";

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

  return (
    <div id="side-panel" className="grey lighten-1">
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
    </div>
  );
}

export default SidePanel;
