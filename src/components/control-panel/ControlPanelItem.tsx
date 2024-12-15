import { useDispatch, useSelector } from "react-redux";
import { getShapeHtml } from "../../shapes";
import { RootState } from "../../state/store";
import { iconData } from "../VectorGraphic";
import { selectShapeTool } from "../../state/slices/shapeSlice";
import { MouseEvent } from "react";

export type PanelItemType = "toolSelect" | "action";

interface PanelItemProps {
  graphic: keyof typeof iconData;
  type: PanelItemType;
  disabled?: true;
}

function ControlPanelItem(props: PanelItemProps) {
  // Remove for full release
  const unusableItems = ["Shapes", "Fill", "Cut", "Copy", "Paste"];
  const disabled = "disabled" in props || unusableItems.includes(props.graphic);

  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selectedTool
  );
  const toolSelector = props.graphic === "Cursor" ? "" : props.graphic;

  function handleClick(event: MouseEvent) {
    if (props.type === "toolSelect") {
      dispatch(
        selectShapeTool(props.graphic === "Cursor" ? "" : props.graphic)
      );
    } else if (props.type === "action") {
      // Start an animation to show feedback that the user selected it
      const element = event.target as HTMLElement;
      if (!element) return;
      element.closest("a")?.classList.add("selected");
      setTimeout(() => element.closest("a")?.classList.remove("selected"), 80);
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
    color: disabled ? "#999999" : "#000000",
  };
  const shapeHtml = getShapeHtml(buttonData);
  return (
    <a role="button" className={className} onClick={handleClick}>
      {shapeHtml}
    </a>
  );
}

export default ControlPanelItem;
