import { useDispatch, useSelector } from "react-redux";
import { getShapeHtml } from "../../shapes";
import { RootState } from "../../state/store";
import { iconData } from "../VectorGraphic";
import { selectShapeTool } from "../../state/slices/shapeSlice";
import { MouseEvent } from "react";
import { getShapeData } from "../../helpers";
import useOutsideClick from "../../hooks/useOutsideClick";
import ColorPickerWindow from "../inputs/ColorPickerWindow";
import ControlPanelWindow from "./ControlPanelWindow";

export type PanelItemType = "toolSelect" | "action";

interface PanelItemProps {
  graphic: keyof typeof iconData;
  type: PanelItemType;
  disabled?: true;
}

interface PaletteDisplayProps {
  active: boolean;
}

function ControlPanelItem(props: PanelItemProps) {
  const activeClick = useOutsideClick();
  // Remove for full release
  const unusableItems = ["Fill", "Dropper", "Cut", "Copy", "Paste"];

  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selectedTool
  );
  const toolSelector = props.graphic === "Cursor" ? "" : props.graphic;
  const disabled = "disabled" in props || unusableItems.includes(props.graphic);

  function handleClick(event: MouseEvent) {
    if (props.type === "toolSelect") {
      dispatch(
        selectShapeTool(props.graphic === "Cursor" ? "" : props.graphic)
      );
    } else if (props.type === "action") {
      activeClick.handleClickInside();
      // Start an animation to show feedback that the user selected it
      const element = event.target as HTMLElement;
      if (!element) return;
      if (
        !element.closest(".prevent-select") ||
        element.classList.contains("prevent-select")
      ) {
        element.closest("a")?.classList.add("selected");
        setTimeout(
          () => element.closest("a")?.classList.remove("selected"),
          80
        );
      }
    }
  }

  let className = "control-panel-item " + props.type;
  if (disabled) {
    className += " disabled";
  } else if (selectedShape === toolSelector) {
    className += " selected";
  }
  const buttonData = {
    type: props.graphic,
    color: disabled ? "#999999" : "#343434",
  };
  const shapeHtml = getShapeHtml(buttonData);
  return (
    <a
      role="button"
      className={className}
      onClick={handleClick}
      ref={activeClick.ref}
    >
      {shapeHtml}
      {props.graphic === "Palette" && (
        <PaletteDisplay active={activeClick.isActive}></PaletteDisplay>
      )}
    </a>
  );
}

function PaletteDisplay(props: PaletteDisplayProps) {
  const shapeData = useSelector((state: RootState) => state.shapes);

  let colorPickerStyles = {};

  if (shapeData.selectedShapes.length === 0) {
    colorPickerStyles = {
      backgroundColor: shapeData.color1,
    };
  } else if (shapeData.selectedShapes.length === 1) {
    const selectedShape = getShapeData(shapeData.selectedShapes[0]);
    if (selectedShape) {
      colorPickerStyles = {
        backgroundColor: selectedShape.color,
      };
    }
  }

  return (
    <div
      className="color-display prevent-select"
      style={colorPickerStyles}
      aria-hidden
    >
      {props.active && (
        <ControlPanelWindow content={ColorPickerWindow}></ControlPanelWindow>
      )}
    </div>
  );
}

export default ControlPanelItem;
