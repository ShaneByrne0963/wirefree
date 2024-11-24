import { MouseEvent, useRef, useState } from "react";
import Canvas from "./Canvas";
import { clamp } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { addShape } from "../../state/slices/pageSlice";
import { ShapeProps, ShapeStyles } from "./CanvasShape";
import { RootState } from "../../state/store";
import { ShapeHtmlProps } from "../../shapes";

const minShapeSize = 2;

function CanvasContainer() {
  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selected
  );
  let [shapeCreatePoint, setShapeCreatePoint] = useState([-1, -1]);
  let shapeCurrentPoint = useRef([-1, -1]);
  let isCreatingShape = useRef(false);

  const createShapeData = useRef<ShapeHtmlProps>({
    type: selectedShape,
    width: Math.abs(shapeCreatePoint[0] - shapeCurrentPoint.current[0]),
    height: Math.abs(shapeCreatePoint[1] - shapeCurrentPoint.current[1]),
    color: "rgba(0, 0, 0, 0.6)",
  });

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
        createShapeData.current = {
          type: selectedShape,
          width: Math.abs(shapeCreatePoint[0] - shapeCurrentPoint.current[0]),
          height: Math.abs(shapeCreatePoint[1] - shapeCurrentPoint.current[1]),
          color: "rgba(0, 0, 0, 0.6)",
        };
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
        createShapeData.current.width = Math.abs(
          shapeCreatePoint[0] - shapeCurrentPoint.current[0]
        );
        createShapeData.current.height = Math.abs(
          shapeCreatePoint[1] - shapeCurrentPoint.current[1]
        );
        shapeCreateElement.setAttribute("style", shapeStyle);
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
    if (shapeCreateElement) {
      // Extract the style properties from the shape create element into an object
      let shapeStyle = shapeCreateElement.getAttribute("style");
      if (shapeStyle) {
        const shapeProperties = shapeStyle
          .split("px; ")
          .map((prop) => prop.replace("px;", "").split(": "));
        let shapeObject: ShapeProps = {
          props: createShapeData.current,
          styles: {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
          },
        };
        shapeProperties.map((item) => {
          const [key, value] = item;
          shapeObject.styles[key as keyof ShapeStyles] = parseFloat(value);
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
    <div id="canvas-container" onMouseDown={handleMouseDown}>
      <Canvas
        startPoint={shapeCreatePoint}
        shapeProps={createShapeData.current}
      ></Canvas>
    </div>
  );
}

export default CanvasContainer;
