import { useDispatch, useSelector } from "react-redux";
import { getShapeHtml } from "../../shapes";
import { RootState } from "../../state/store";
import { iconData } from "../VectorGraphic";
import { selectShapeTool } from "../../state/slices/shapeSlice";

interface PanelItemProps {
  graphic: keyof typeof iconData;
  type: "toolSelect";
  disabled?: true;
}

function ControlPanelItem(props: PanelItemProps) {
  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selectedTool
  );
  const toolSelector = props.graphic === "Cursor" ? "" : props.graphic;

  function handleClick() {
    if (props.type === "toolSelect") {
      dispatch(
        selectShapeTool(props.graphic === "Cursor" ? "" : props.graphic)
      );
    }
  }

  let className = "control-panel-item";
  if ("disabled" in props) {
    className += " disabled";
  } else if (selectedShape === toolSelector) {
    className += " selected";
  }
  const buttonData = {
    type: props.graphic,
    color: "disabled" in props ? "#999999" : "#000000",
  };
  const shapeHtml = getShapeHtml(buttonData);
  return (
    <a role="button" className={className} onClick={handleClick}>
      {shapeHtml}
    </a>
  );
}

export default ControlPanelItem;
