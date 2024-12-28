import { MouseEvent, useRef, useState } from "react";
import Canvas from "./Canvas";
import { clamp } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { addShape } from "../../state/slices/pageSlice";
import { ShapeProps, ShapeStyles } from "./CanvasShape";
import { RootState } from "../../state/store";
import { Axis } from "../../context";
import { selectTool } from "../../state/slices/controlSlice";
import deselectShapes from "../../hooks/deselectShapes";

const minShapeSize = 2;
const minClickDistance = 8;

function CanvasContainer() {
  const dispatch = useDispatch();
  const screenData = useSelector((state: RootState) => state.screenSize);
  const selectedScreen = screenData.activeScreens[screenData.selectedScreen];
  const controlData = useSelector((state: RootState) => state.controls);
  const handleDeselect = deselectShapes();

  const [shapeCreatePoint, setShapeCreatePoint] = useState([-1, -1]);
  const shapeCurrentPoint = useRef([-1, -1]);
  const isCreatingShape = useRef(false);
  // Used to determine if the user clicks directly on an element
  const mouseClickOrigin = useRef([0, 0]);
  const clickedElement = useRef<HTMLElement | null>(null);

  function snapToGrid(value: number, axis: Axis) {
    let snapValue = 0;
    const screenValue =
      axis === "x" ? selectedScreen.width : selectedScreen.height;
    const gridValue =
      axis === "x" ? controlData.grid.width : controlData.grid.height;
    const unit =
      axis === "x" ? controlData.grid.widthUnits : controlData.grid.heightUnits;

    switch (unit) {
      case "px":
        snapValue = gridValue;
        break;
      case "%":
        snapValue = screenValue * (gridValue / 100);
        break;
      case "cells":
        snapValue = screenValue / gridValue;
    }
    return Math.round(value / snapValue) * snapValue;
  }

  // Ensure the user clicked on an element directly without dragging the mouse
  function handleMouseClick(event: MouseEvent) {
    const distanceX = Math.abs(mouseClickOrigin.current[0] - event.clientX);
    const distanceY = Math.abs(mouseClickOrigin.current[1] - event.clientY);

    if (
      distanceX < minClickDistance &&
      distanceY < minClickDistance &&
      clickedElement.current === (event.target as HTMLElement)
    ) {
      handleDeselect(event);
    }
  }

  // This mouse down event initialises a shape creation
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    const [mouseX, mouseY] = [event.clientX, event.clientY];
    mouseClickOrigin.current = [mouseX, mouseY];
    clickedElement.current = event.target as HTMLElement;
    if (
      controlData.selectedTool === "Shapes" ||
      controlData.selectedTool === "Text"
    ) {
      const canvasElement = document.querySelector("#canvas");
      if (canvasElement) {
        const canvasRect = canvasElement.getBoundingClientRect();
        const canvasStyles = window.getComputedStyle(canvasElement);
        const canvasScale = parseFloat(canvasStyles.getPropertyValue("scale"));
        let createPointX =
          clamp(mouseX - canvasRect.x, 0, canvasRect.width) / canvasScale;
        let createPointY =
          clamp(mouseY - canvasRect.y, 0, canvasRect.height) / canvasScale;

        // Snap to the grid
        if (controlData.grid.enabled) {
          createPointX = snapToGrid(createPointX, "x");
          createPointY = snapToGrid(createPointY, "y");
        }
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
      if (canvasElement) {
        const canvasRect = canvasElement.getBoundingClientRect();
        const canvasStyles = window.getComputedStyle(canvasElement);
        const canvasScale = parseFloat(canvasStyles.getPropertyValue("scale"));
        let currentX =
          clamp(mouseX - canvasRect.x, 0, canvasRect.width) / canvasScale;
        let currentY =
          clamp(mouseY - canvasRect.y, 0, canvasRect.height) / canvasScale;
        // Snap to the grid
        if (controlData.grid.enabled) {
          currentX = snapToGrid(currentX, "x");
          currentY = snapToGrid(currentY, "y");
        }

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

    const shapeCreateElement = document.querySelector("#shape-create");
    if (shapeCreateElement) {
      // Extract the style properties from the shape create element into an object
      let shapeStyle = shapeCreateElement.getAttribute("style");
      if (shapeStyle) {
        const shapeProperties = shapeStyle
          .split("px; ")
          .map((prop) => prop.replace("px;", "").split(": "));

        const shapeProps =
          controlData.selectedTool === "Text"
            ? {
                type: "Shape:Text",
                color: controlData.color1,
                text: "",
              }
            : {
                type: controlData.shapeTool,
                color: controlData.color1,
              };
        let shapeObject: ShapeProps = {
          props: shapeProps,
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
        // Deselect the text tool to allow text editing
        if (controlData.selectedTool === "Text") {
          dispatch(selectTool(""));
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

  let classList = [];
  if (
    controlData.selectedTool === "Shapes" ||
    controlData.selectedTool === "Text"
  ) {
    classList.push("drag-create");
  }
  if (controlData.selectedTool === "Text") {
    classList.push("text-outline");
  }

  return (
    <div
      id="canvas-container"
      onClick={handleMouseClick}
      onMouseDown={handleMouseDown}
      className={classList.join(" ")}
    >
      <Canvas
        startPoint={shapeCreatePoint}
        shapeProps={{ type: controlData.shapeTool, color: controlData.color1 }}
      ></Canvas>
    </div>
  );
}

export default CanvasContainer;
