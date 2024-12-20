import { useDispatch, useSelector } from "react-redux";
import { getShapeHtml } from "../../shapes";
import { RootState } from "../../state/store";
import { iconData } from "../VectorGraphic";
import { selectTool } from "../../state/slices/controlSlice";
import { MouseEvent, useState } from "react";
import { getShapeData } from "../../helpers";
import useOutsideClick from "../../hooks/useOutsideClick";
import ControlPanelWindow from "./Windows/ControlPanelWindow";

export type PanelItemType = "toolSelect" | "action" | "toggle";

interface PanelItemProps {
  graphic: keyof typeof iconData;
  type: PanelItemType;
  disabled?: true;
  options?: React.ComponentType;
  props?: { [key: string]: any };
}

function ControlPanelItem(props: PanelItemProps) {
  const activeClick = useOutsideClick();
  const [tab, setTab] = useState(0);
  // Remove for full release
  const unusableItems = ["Fill", "Dropper", "Cut", "Copy", "Paste"];

  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.controls.selectedTool
  );
  const toolSelector = props.graphic === "Cursor" ? "" : props.graphic;
  const disabled = "disabled" in props || unusableItems.includes(props.graphic);

  function handleClick(event: MouseEvent) {
    if (props.type === "toolSelect") {
      // Open the options menu if clicked while the control item is selected
      const currentTool = props.graphic === "Cursor" ? "" : props.graphic;
      if ("options" in props && selectedShape === currentTool) {
        activeClick.handleClickInside();
      }
      dispatch(selectTool(currentTool));
    } else if (props.type === "toggle") {
      console.log("");
    } else if (props.type === "action") {
      activeClick.handleClickInside();
      // Start an animation to show feedback that the user selected it
      const element = event.target as HTMLElement;
      if (!element) return;
      if (!element.closest(".control-panel-window")) {
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
      {props.graphic === "Palette" && <PaletteDisplay></PaletteDisplay>}
      {props.options && activeClick.isActive && (
        <ControlPanelWindow
          content={props.options}
          props={{ ...props.props, tab: tab, setTab: setTab }}
        ></ControlPanelWindow>
      )}
    </a>
  );
}

function PaletteDisplay() {
  const controlData = useSelector((state: RootState) => state.controls);

  let colorPickerStyles = {};

  if (controlData.selectedShapes.length === 0) {
    colorPickerStyles = {
      backgroundColor: controlData.color1,
    };
  } else if (controlData.selectedShapes.length === 1) {
    const selectedShape = getShapeData(controlData.selectedShapes[0]);
    if (selectedShape) {
      colorPickerStyles = {
        backgroundColor: selectedShape.color,
      };
    }
  }

  return <div className="color-display" style={colorPickerStyles}></div>;
}

export default ControlPanelItem;
