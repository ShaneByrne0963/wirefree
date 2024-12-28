import { useEffect } from "react";
import { exportPage } from "../../helpers";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import CanvasShape, { ShapeProps } from "./CanvasShape";
import CanvasText from "./CanvasText";

interface CanvasRenderProps {
  page: string;
  screenSize: string;
}

function CanvasRender(props: CanvasRenderProps) {
  const pageData = useSelector((state: RootState) => state.pages.pages).filter(
    (page) => page.name === props.page
  )[0].data[props.screenSize];
  const persistentLayers = useSelector(
    (state: RootState) => state.pages.persistentLayers[props.screenSize]
  );
  let renderElements: ShapeProps[] = [];

  pageData.layers.map((layer: string) => {
    // Regular layers
    if (layer[0] === "_") {
      // Add all the shapes to the canvas if the layer is visible
      if (pageData[layer].visible) {
        renderElements.push(...pageData[layer].shapes);
      }
    } else {
      // Persistent Layers
      if (pageData[`${layer}_visible`]) {
        renderElements.push(...persistentLayers[layer]);
      }
    }
  });

  // Render the canvas when it is loaded
  useEffect(() => {
    exportPage();
    setTimeout(() => console.log("Image Exported!"), 10);
  }, []);

  function renderShape(value: ShapeProps, index: number) {
    const shapeHtml =
      value.props.type === "Shape:Text" ? (
        <CanvasText
          id={`render-shape-${index}`}
          styles={value.styles}
          props={value.props}
          key={index}
          layer=""
          index={0}
          selected={false}
          active={false}
        ></CanvasText>
      ) : (
        <CanvasShape
          id={`render-shape-${index}`}
          styles={value.styles}
          props={value.props}
          key={index}
          layer=""
          index={0}
          selected={false}
          active={false}
        ></CanvasShape>
      );
    return shapeHtml;
  }

  return <div id="canvas-render">{renderElements.map(renderShape)}</div>;
}

export default CanvasRender;
