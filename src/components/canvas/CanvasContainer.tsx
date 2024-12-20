import { MouseEvent, useRef, useState } from "react";
import Canvas from "./Canvas";
import { clamp } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { addShape } from "../../state/slices/pageSlice";
import { ShapeProps, ShapeStyles } from "./CanvasShape";
import { RootState } from "../../state/store";
import { Axis } from "../../context";
import {
  deselectAllShapes,
  selectShape,
} from "../../state/slices/controlSlice";

const minShapeSize = 2;

function CanvasContainer() {
  const dispatch = useDispatch();
  const screenData = useSelector((state: RootState) => state.screenSize);
  const selectedScreen = screenData.activeScreens[screenData.selectedScreen];

  const shapeColor = useSelector((state: RootState) => state.controls.color1);
  const selectedTool = useSelector(
    (state: RootState) => state.controls.selectedTool
  );
  const selectedShape = useSelector(
    (state: RootState) => state.controls.shapeTool
  );
  const grid = useSelector((state: RootState) => state.controls.grid);
  const [shapeCreatePoint, setShapeCreatePoint] = useState([-1, -1]);
  const shapeCurrentPoint = useRef([-1, -1]);
  const isCreatingShape = useRef(false);

  function snapToGrid(value: number, axis: Axis) {
    let snapValue = 0;
    const screenValue =
      axis === "x" ? selectedScreen.width : selectedScreen.height;
    const gridValue = axis === "x" ? grid.width : grid.height;
    const unit = axis === "x" ? grid.widthUnits : grid.heightUnits;

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

  // Handles the selection of shapes
  function handleMouseClick(event: MouseEvent) {
    dispatch(deselectAllShapes());

    if (!selectedTool) {
      const element = event.target as HTMLElement;

      // Check if the clicked element is a shape
      if (element.classList.contains("canvas-element")) {
        dispatch(selectShape(element.id));
        return;
      }

      // If not, check if it is a child of one
      const parentElement = element.closest(".canvas-element") as HTMLElement;
      if (parentElement) {
        dispatch(selectShape(parentElement.id));
      }
    }
  }

  // This mouse down event initialises a shape creation
  function handleMouseDown(event: MouseEvent<HTMLDivElement>) {
    if (selectedTool === "Shapes" || selectedTool === "Text") {
      const [mouseX, mouseY] = [event.clientX, event.clientY];
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
        if (grid.enabled) {
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
        if (grid.enabled) {
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
          selectedTool === "Text"
            ? {
                type: "Shape:Text",
                color: shapeColor,
                text: "",
              }
            : {
                type: selectedShape,
                color: shapeColor,
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
  if (selectedTool === "Shapes" || selectedTool === "Text") {
    classList.push("drag-create");
  }
  if (selectedTool === "Text") {
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
        shapeProps={{ type: selectedShape, color: shapeColor }}
      ></Canvas>
    </div>
  );
}

export default CanvasContainer;
