import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import CanvasCreateShape from "./CanvasCreateShape";
import CanvasShape, { ShapeProps } from "./CanvasShape";
import { ShapeHtmlProps } from "../../shapes";
import updateCanvasScale from "../../hooks/updateCanvasScale";
import CanvasGrid from "./CanvasGrid";
import CanvasText from "./CanvasText";

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
  const gridData = useSelector((state: RootState) => state.controls.grid);
  const selectedShapes = useSelector(
    (state: RootState) => state.controls.selectedShapes
  );
  const selectedScreenSize = activeScreenSizes[selectedScreenIndex];
  const selectedLayer = useSelector((state: RootState) => {
    const selectedPage = state.pages.pages[state.pages.selectedPage];
    const pageData = selectedPage.data[selectedScreenSize.name];
    return pageData.layers[pageData.selected];
  });
  const canvasRef = updateCanvasScale(selectedScreenSize);

  // Rendering each shape
  const pageData = useSelector((state: RootState) => state.pages);
  const currentPage =
    pageData.pages[pageData.selectedPage].data[selectedScreenSize.name];
  let renderElements: (ShapeProps | string)[] = [];
  currentPage.layers.map((layer: string) => {
    renderElements.push(layer);
    // Regular layers
    if (layer[0] === "_") {
      // Add all the shapes to the canvas if the layer is visible
      if (currentPage[layer].visible) {
        renderElements.push(...currentPage[layer].shapes);
      }
    } else {
      // Persistent Layers
      if (currentPage[`${layer}_visible`]) {
        renderElements.push(
          ...pageData.persistentLayers[selectedScreenSize.name][layer]
        );
      }
    }
  });
  let shapeLayer = "";
  let shapeIndex = 0;
  let shapeCount = 0;

  function renderShape(value: ShapeProps | string) {
    if (typeof value === "string") {
      shapeLayer = value;
      shapeIndex = 0;
      return;
    }
    shapeCount++;
    const shapeHtml =
      value.props.type === "Shape:Text" ? (
        <CanvasText
          id={`shape-${shapeCount}`}
          styles={value.styles}
          props={value.props}
          key={shapeCount}
          layer={shapeLayer}
          index={shapeIndex}
          selected={selectedShapes.includes(`shape-${shapeCount}`)}
          active={selectedLayer === shapeLayer}
        ></CanvasText>
      ) : (
        <CanvasShape
          id={`shape-${shapeCount}`}
          styles={value.styles}
          props={value.props}
          key={shapeCount}
          layer={shapeLayer}
          index={shapeIndex}
          selected={selectedShapes.includes(`shape-${shapeCount}`)}
          active={selectedLayer === shapeLayer}
        ></CanvasShape>
      );
    shapeIndex++;
    return shapeHtml;
  }

  return (
    <div id="canvas" className="z-depth-2" ref={canvasRef}>
      <div id="canvas-elements">{renderElements.map(renderShape)}</div>
      {props.startPoint[0] >= 0 && (
        <CanvasCreateShape props={props.shapeProps}></CanvasCreateShape>
      )}
      {gridData.enabled && <CanvasGrid></CanvasGrid>}
    </div>
  );
}

export default Canvas;
