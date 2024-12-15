import { useSelector } from "react-redux";
import { getShapeHtml } from "../../shapes";
import { RootState } from "../../state/store";

function ControlPanelItem() {
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selectedTool
  );

  const buttonData = {
    type: "Cursor",
    width: 20,
    height: 20,
    color: "black",
  };
  const shapeHtml = getShapeHtml(buttonData);
  return (
    <a
      role="button"
      className={
        "control-panel-item" + (selectedShape === "" ? " selected" : "")
      }
    >
      {shapeHtml}
    </a>
  );
}

export default ControlPanelItem;
