import { MouseEvent, useRef, useState } from "react";
import Canvas from "./Canvas";
import { useDispatch, useSelector } from "react-redux";
import { addShape, updateShape } from "../../state/slices/pageSlice";
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

  const [mouseStart, setMouseStart] = useState<number[] | null>(null);
  const [shapeMove, setShapeMove] = useState(false);
  const shapeCurrentPoint = useRef([-1, -1]);
  const hasClicked = useRef(false);
  // Used to determine if the user clicks directly on an element
  const mouseClickOrigin = useRef([0, 0]);
  const clickedElement = useRef<HTMLElement | null>(null);
  const mouseEventType = useRef<"create" | "move" | null>(null);
  const selectedShapes = useRef<any>(null);

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
    const canvasElement = document.querySelector("#canvas");
    let createPointX, createPointY;

    if (canvasElement) {
      const canvasRect = canvasElement.getBoundingClientRect();
      const canvasStyles = window.getComputedStyle(canvasElement);
      const canvasScale = parseFloat(canvasStyles.getPropertyValue("scale"));
      createPointX = (mouseX - canvasRect.x) / canvasScale;
      createPointY = (mouseY - canvasRect.y) / canvasScale;

      // Snap to the grid
      if (controlData.grid.enabled) {
        createPointX = snapToGrid(createPointX, "x");
        createPointY = snapToGrid(createPointY, "y");
      }

      if (controlData.selectedTool === "") {
        if (clickedElement.current.closest(".selected")) {
          mouseEventType.current = "move";
          setMouseStart([createPointX, createPointY]);
          // Store the left and top styles of all selected elements for reference
          let selectedStyles: Record<string, any> = {};
          document
            .querySelectorAll(".canvas-element.selected")
            .forEach((element: Element) => {
              let el = element as HTMLElement;
              let left = parseInt(el.style.left.replace("px", ""));
              let top = parseInt(el.style.top.replace("px", ""));

              selectedStyles[el.id] = [left, top];
            });
          selectedShapes.current = selectedStyles;
        }
      } else if (
        controlData.selectedTool === "Shapes" ||
        controlData.selectedTool === "Text"
      ) {
        mouseEventType.current = "create";
        setMouseStart([createPointX, createPointY]);
      }
    }
  }

  // Update the creating shape's size
  function handleShapeCreateMove(event: any) {
    let shapeCreateElement = document.querySelector("#shape-create");
    if (shapeCreateElement && mouseStart !== null) {
      const [startX, startY] = mouseStart;
      const [mouseX, mouseY] = [event.clientX, event.clientY];
      const canvasElement = document.querySelector("#canvas");
      if (canvasElement) {
        const canvasRect = canvasElement.getBoundingClientRect();
        const canvasStyles = window.getComputedStyle(canvasElement);
        const canvasScale = parseFloat(canvasStyles.getPropertyValue("scale"));
        let currentX = (mouseX - canvasRect.x) / canvasScale;
        let currentY = (mouseY - canvasRect.y) / canvasScale;
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
  function handleShapeCreate() {
    // Remove the events listening for mouse actions, as the process has reached its end
    document.removeEventListener("mousemove", handleShapeCreateMove);
    document.removeEventListener("mouseup", handleShapeCreate);
    hasClicked.current = false;

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
    setMouseStart(null);
  }

  function handleShapeMove(event: any) {
    const distanceX = event.clientX - mouseClickOrigin.current[0];
    const distanceY = event.clientY - mouseClickOrigin.current[1];

    if (
      Math.abs(distanceX) >= minClickDistance ||
      Math.abs(distanceY) >= minClickDistance
    ) {
      if (!shapeMove) {
        setShapeMove(true);
      }
      const canvasElement = document.querySelector("#canvas");
      if (canvasElement) {
        const canvasStyles = window.getComputedStyle(canvasElement);
        const canvasScale = parseFloat(canvasStyles.getPropertyValue("scale"));

        for (let [key, value] of Object.entries(selectedShapes.current) as [
          string,
          [string, string]
        ]) {
          const element = document.getElementById(key);
          if (!element) continue;
          element.style.left = `${value[0] + distanceX / canvasScale}px`;
          element.style.top = `${value[1] + distanceY / canvasScale}px`;
        }
      }
    }
  }

  function handleShapeMoveEnd() {
    // Update all the moved shapes in the store
    for (let key of Object.keys(selectedShapes.current)) {
      const element = document.getElementById(key);
      if (!element) continue;
      let update = {
        styles: {
          left: parseInt(element.style.left.replace("px", "")),
          top: parseInt(element.style.top.replace("px", "")),
        },
      };
      let layer = element.getAttribute("data-layer");
      let index = element.getAttribute("data-index");
      if (!layer || !index) continue;
      dispatch(updateShape([layer, parseInt(index), update]));
    }

    // Reset all values
    document.removeEventListener("mousemove", handleShapeMove);
    document.removeEventListener("mouseup", handleShapeMoveEnd);
    hasClicked.current = false;
    setShapeMove(false);
    setMouseStart(null);
    selectedShapes.current = null;
  }

  // Listen for mouse movements to update the shape size
  if (mouseStart !== null && !hasClicked.current) {
    hasClicked.current = true;
    if (mouseEventType.current === "create") {
      document.addEventListener("mousemove", handleShapeCreateMove);
      document.addEventListener("mouseup", handleShapeCreate);
    } else if (mouseEventType.current === "move") {
      document.addEventListener("mousemove", handleShapeMove);
      document.addEventListener("mouseup", handleShapeMoveEnd);
    }
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
  if (shapeMove) {
    classList.push("shape-move");
  }

  return (
    <div
      id="canvas-container"
      onClick={handleMouseClick}
      onMouseDown={handleMouseDown}
      className={classList.join(" ")}
    >
      <Canvas
        startPoint={mouseStart}
        shapeProps={{ type: controlData.shapeTool, color: controlData.color1 }}
      ></Canvas>
    </div>
  );
}

export default CanvasContainer;
