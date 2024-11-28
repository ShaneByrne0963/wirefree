import { useSelector } from "react-redux";
import useOutsideClick from "../../../hooks/useOutsideClick";
import ColorPickerWindow from "../../inputs/ColorPickerWindow";
import { RootState } from "../../../state/store";

function ControlPanel() {
  const colorClick = useOutsideClick();
  const color1 = useSelector((state: RootState) => state.shapes.color1);

  const color1Styles = {
    backgroundColor: color1,
  };
  return (
    <div id="control-panel-container">
      <div id="control-panel">
        <div>Colour:</div>
        <div
          id="color-picker"
          onClick={colorClick.handleClickInside}
          ref={colorClick.ref}
          style={color1Styles}
        >
          <div className="border"></div>
          {colorClick.isActive && <ColorPickerWindow></ColorPickerWindow>}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
