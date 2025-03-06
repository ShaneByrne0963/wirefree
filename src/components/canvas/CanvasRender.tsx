import { useEffect, useRef } from "react";
import { exportPage } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import CanvasShape, { ShapeProps } from "./CanvasShape";
import CanvasText from "./CanvasText";
import {
  exportProps,
  removeExportingPage,
} from "../../state/slices/controlSlice";

function CanvasRender(props: exportProps) {
  const dispatch = useDispatch();
  const rendered = useRef(false);
  const pageData = useSelector((state: RootState) => state.pages.pages).filter(
    (page) => page.name === props.page
  )[0].data[props.screenSize];
  const persistentLayers = useSelector(
    (state: RootState) => state.pages.persistentLayers[props.screenSize]
  );
  const screenSizeData = useSelector(
    (state: RootState) =>
      state.screenSize.activeScreens.filter(
        (data) => data.name === props.screenSize
      )[0]
  );
  const canvasStyles = {
    width: `${screenSizeData.width}px`,
    height: `${screenSizeData.height}px`,
  };
  let renderElements: ShapeProps[] = [];
  const exportingPages = useSelector(
    (state: RootState) => state.controls.exportingPages
  );

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

  async function startExport() {
    if (!rendered.current) {
      rendered.current = true;
      await exportPage();
      dispatch(removeExportingPage());
      if (exportingPages.length > 1) {
        setTimeout(() => {
          rendered.current = false;
          startExport();
        }, 10);
      }
    }
  }
  // Render the canvas when it is loaded
  useEffect(() => {
    startExport();
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

  return (
    <div
      id="canvas-render"
      style={canvasStyles}
      data-page={props.page}
      data-screensize={props.screenSize}
    >
      {renderElements.map(renderShape)}
    </div>
  );
}

export default CanvasRender;
