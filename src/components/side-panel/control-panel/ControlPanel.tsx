import { useSelector } from "react-redux";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ColorPickerWindow from "../../inputs/ColorPickerWindow";
import { RootState } from "../../../state/store";
import { getShapeData } from "../../../helpers";

function ControlPanel() {
  const colorClick = useOutsideClick();
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
    <div id="control-panel-container">
      <div id="control-panel">
        <div>Colour:</div>
        <div
          id="color-picker"
          onClick={colorClick.handleClickInside}
          ref={colorClick.ref}
          style={colorPickerStyles}
        >
          <div className="border"></div>
          {colorClick.isActive && <ColorPickerWindow></ColorPickerWindow>}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
