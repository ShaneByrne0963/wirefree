import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import {
  deselectShapeTool,
  selectShapeTool,
} from "../../../state/slices/controlSlice";
import { useRef } from "react";
import { getShapeHtml } from "../../../shapes";

interface ShapeButtonProps {
  buttonType: string;
}

const buttonColor = "rgba(0, 0, 0, 0.6)";

// The amount of milliseconds that allows another click to add the shape to favorites
const clickCooldown = 500;

function ShapeButton(props: ShapeButtonProps) {
  const buttonData = {
    type: props.buttonType,
    color: buttonColor,
  };
  const buttonHtml = getShapeHtml(buttonData);
  const selectedButton = useSelector(
    (state: RootState) => state.controls.selectedTool
  );
  const isClicked = useRef(false);
  const selected = props.buttonType === selectedButton;
  const dispatch = useDispatch();

  function handleClick() {
    if (!isClicked.current) {
      dispatch(
        selected ? deselectShapeTool() : selectShapeTool(props.buttonType)
      );
      isClicked.current = true;
      setTimeout(() => (isClicked.current = false), clickCooldown);
    } else {
      // Add logic to add shape to favorites here
    }
  }

  return (
    <div
      className={"shape-button" + (selected ? " selected" : "")}
      onClick={handleClick}
    >
      {buttonHtml}
    </div>
  );
}

export default ShapeButton;
