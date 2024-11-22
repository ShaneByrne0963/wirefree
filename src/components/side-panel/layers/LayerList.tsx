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

  // Getting the information of each object
  let renderLayers = currentPage.layers.map((layer: string) => {
    const displayName = layer.slice(1);
    return layer[0] === "_"
      ? {
          name: displayName,
          visible: currentPage[layer].visible,
          isBaseLayer: false,
        }
      : {
          name: layer.slice(1),
          visible: pageData.persistentLayers[currentScreenSize][layer].visible,
          isBaseLayer: true,
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
            isBase={data.isBaseLayer}
            selected={currentPage.selected === index}
          ></LayerListItem>
        );
      })}
    </div>
  );
}

export default LayerList;
