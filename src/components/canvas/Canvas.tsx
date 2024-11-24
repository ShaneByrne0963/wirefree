import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import CanvasCreateShape from "./CanvasCreateShape";
import CanvasShape, { ShapeProps } from "./CanvasShape";
import { ShapeHtmlProps } from "../../shapes";

interface CanvasProps {
  startPoint: number[];
  shapeProps: ShapeHtmlProps;
}

function Canvas(props: CanvasProps) {
  const activeScreenSizes = useSelector(
    (state: RootState) => state.screenSize.activeScreens
  );
  const selectedScreenIndex = useSelector(
    (state: RootState) => state.screenSize.selectedScreen
  );
  const selectedScreenSize = activeScreenSizes[selectedScreenIndex];
  const ratio = selectedScreenSize.width / selectedScreenSize.height;
  const canvasCss = {
    "--aspect-ratio": ratio,
  } as React.CSSProperties;

  // Rendering each shape
  const pageData = useSelector((state: RootState) => state.pages);
  const currentPage =
    pageData.pages[pageData.selectedPage].data[selectedScreenSize.name];
  let renderElements: ShapeProps[] = [];
  currentPage.layers.map((layer: string) => {
    // Regular layers
    if (layer[0] === "_") {
      // Add all the shapes to the canvas if the layer is visible
      if (currentPage[layer].visible) {
        renderElements.push(...currentPage[layer].shapes);
      }
    } else {
      // Persistent Layers
      if (
        pageData.pages[pageData.selectedPage].data[selectedScreenSize.name][
          `${layer}_visible`
        ]
      ) {
        renderElements.push(
          ...pageData.persistentLayers[selectedScreenSize.name][layer]
        );
      }
    }
  });

  return (
    <div id="canvas" style={canvasCss} className="z-depth-2">
      {renderElements.map((element, index) => (
        <CanvasShape
          styles={element.styles}
          props={element.props}
          key={index}
        ></CanvasShape>
      ))}
      {props.startPoint[0] >= 0 && (
        <CanvasCreateShape props={props.shapeProps}></CanvasCreateShape>
      )}
    </div>
  );
}

export default Canvas;
