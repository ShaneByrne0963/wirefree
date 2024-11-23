import { MouseEvent, useRef, useState } from "react";
import Canvas from "./Canvas";
import { clamp } from "../../helpers";

const minShapeSize = 2;

function CanvasContainer() {
  let [shapeCreatePoint, setShapeCreatePoint] = useState([-1, -1]);
  let shapeCurrentPoint = useRef([-1, -1]);
  let isCreatingShape = useRef(false);

  // This mouse down event initialises a shape creation
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
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

        const shapeCss = {
          left: `${Math.min(startX, currentX)}px`,
          top: `${Math.min(startY, currentY)}px`,
          width: `${Math.abs(currentX - startX)}px`,
          height: `${Math.abs(currentY - startY)}px`,
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
        let shapeObject: Record<string, any> = {};
        shapeProperties.map((item) => {
          const [key, value] = item;
          shapeObject[key] = parseFloat(value);
        });
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
      <Canvas createPoint={shapeCreatePoint}></Canvas>
    </div>
  );
}

export default CanvasContainer;
