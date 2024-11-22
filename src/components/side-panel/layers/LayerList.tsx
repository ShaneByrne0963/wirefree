import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import LayerListItem from "./LayerListItem";

function LayerList() {
  const pageData = useSelector((state: RootState) => state.pages);
  const screenSizeData = useSelector((state: RootState) => state.screenSize);
  const currentScreenSize =
    screenSizeData.activeScreens[screenSizeData.selectedScreen].name;
  const currentPage =
    pageData.pages[pageData.selectedPage].data[currentScreenSize];
  let renderLayers = [...currentPage.layers];

  return (
    <div id="layer-list">
      {renderLayers.map((layer: string, index: number) => {
        return (
          <LayerListItem
            name={layer}
            key={index}
            index={index}
            selected={currentPage.selected === index}
          ></LayerListItem>
        );
      })}
    </div>
  );
}

export default LayerList;
