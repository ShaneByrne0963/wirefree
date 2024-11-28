import { MouseEvent, useRef, useState } from "react";
import Canvas from "./Canvas";
import { clamp } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { addShape } from "../../state/slices/pageSlice";
import { ShapeProps, ShapeStyles } from "./CanvasShape";
import { RootState } from "../../state/store";

const minShapeSize = 2;

function CanvasContainer() {
  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selected
  );
  const screenSizeData = useSelector((state: RootState) => state.screenSize);
  const shapeColor = useSelector((state: RootState) => state.shapes.color1);
  const selectedScreenSize =
    screenSizeData.activeScreens[screenSizeData.selectedScreen];
  const [shapeCreatePoint, setShapeCreatePoint] = useState([-1, -1]);
  const shapeCurrentPoint = useRef([-1, -1]);
  const isCreatingShape = useRef(false);

  // This mouse down event initialises a shape creation
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (selectedShape) {
      const [mouseX, mouseY] = [event.clientX, event.clientY];
      const canvasElement = document.querySelector("#canvas");
      const canvasRect = canvasElement?.getBoundingClientRect();
      if (canvasRect) {
        const createPointX = clamp(mouseX - canvasRect.x, 0, canvasRect.width);
        const createPointY = clamp(mouseY - canvasRect.y, 0, canvasRect.height);
        setShapeCreatePoint([createPointX, createPointY]);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    }
  }

  // This mouse move event updates the creating shape's size
  function handleMouseMove(event: any) {
    let shapeCreateElement = document.querySelector("#shape-create");
    if (shapeCreateElement) {
      const [startX, startY] = shapeCreatePoint;
      const [mouseX, mouseY] = [event.clientX, event.clientY];
      const canvasElement = document.querySelector("#canvas");
      const canvasRect = canvasElement?.getBoundingClientRect();
      if (canvasRect) {
        const currentX = clamp(mouseX - canvasRect.x, 0, canvasRect.width);
        const currentY = clamp(mouseY - canvasRect.y, 0, canvasRect.height);
        const [width, height] = [
          Math.abs(currentX - startX),
          Math.abs(currentY - startY),
        ];

        // Updating the styles of the creating shape dynamically
        const shapeCss = {
          left: `${Math.min(startX, currentX)}px`,
          top: `${Math.min(startY, currentY)}px`,
          width: `${width}px`,
          height: `${height}px`,
        };
        let shapeStyle = "";
        for (let [key, value] of Object.entries(shapeCss)) {
          if (shapeStyle.length > 0) {
            shapeStyle += " ";
          }
          shapeStyle += `${key}: ${value};`;
        }
        shapeCurrentPoint.current = [currentX, currentY];
        shapeCreateElement.setAttribute("style", shapeStyle);

        // Prevent the flash of an icon being visible upon creation
        if (shapeCreateElement.classList.contains("invisible")) {
          shapeCreateElement.classList.remove("invisible");
        }
      }
    }
  }

  // This mouse up event creates the shape and adds it to the selected layer
  function handleMouseUp() {
    // Remove the events listening for mouse actions, as the process has reached its end
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    isCreatingShape.current = false;

    let shapeCreateElement = document.querySelector("#shape-create");
    let canvasElement = document.querySelector("#canvas");
    if (shapeCreateElement && canvasElement) {
      // Find the scale of the canvas to translate the shape onto
      const canvasRect = canvasElement.getBoundingClientRect();
      const scale = canvasRect.width / selectedScreenSize.width;

      // Extract the style properties from the shape create element into an object
      let shapeStyle = shapeCreateElement.getAttribute("style");
      if (shapeStyle) {
        const shapeProperties = shapeStyle
          .split("px; ")
          .map((prop) => prop.replace("px;", "").split(": "));
        let shapeObject: ShapeProps = {
          props: { type: selectedShape, color: shapeColor },
          styles: {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
          },
        };
        shapeProperties.map((item) => {
          const [key, value] = item;
          shapeObject.styles[key as keyof ShapeStyles] =
            parseFloat(value) / scale;
        });

        // Make sure the new element isn't too small for the canvas
        if (
          shapeObject.styles.width > minShapeSize &&
          shapeObject.styles.height > minShapeSize
        ) {
          dispatch(addShape(shapeObject));
        }
      }
    }
    // Finally, reset the state of the start and end points
    shapeCurrentPoint.current = [-1, -1];
    setShapeCreatePoint([-1, -1]);
  }

  // Listen for mouse movements to update the shape size
  if (shapeCreatePoint[0] >= 0 && !isCreatingShape.current) {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    isCreatingShape.current = true;
  }

  return (
    <div
      id="canvas-container"
      onMouseDown={handleMouseDown}
      className={selectedShape ? "shape-selected" : ""}
    >
      <Canvas
        startPoint={shapeCreatePoint}
        shapeProps={{ type: selectedShape, color: shapeColor }}
      ></Canvas>
    </div>
  );
}

export default CanvasContainer;
