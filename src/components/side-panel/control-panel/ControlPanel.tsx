import useOutsideClick from "../../../hooks/useOutsideClick";
import ColorPickerWindow from "../../inputs/ColorPickerWindow";

function ControlPanel() {
  const colorClick = useOutsideClick();
  return (
    <div id="control-panel-container">
      <div id="control-panel">
        <div>Colour:</div>
        <div
          id="color-picker"
          onClick={colorClick.handleClickInside}
          ref={colorClick.ref}
        >
          <div className="border"></div>
          {colorClick.isActive && <ColorPickerWindow></ColorPickerWindow>}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
