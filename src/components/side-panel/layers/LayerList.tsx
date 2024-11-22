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
  let renderLayers = currentPage.layers.map((layer: string) => {
    return {
      name: layer,
      visible: currentPage[`_${layer}`].visible,
    };
  });

  return (
    <div id="layer-list">
      {renderLayers.map((data: typeof renderLayers, index: number) => {
        return (
          <LayerListItem
            name={data.name}
            key={index}
            index={index}
            visible={data.visible}
            selected={currentPage.selected === index}
          ></LayerListItem>
        );
      })}
    </div>
  );
}

export default LayerList;
