import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import {
  deselectTool,
  selectShapeTool,
} from "../../../../state/slices/controlSlice";
import { useRef } from "react";
import { getShapeHtml } from "../../../../shapes";

interface ShapeButtonProps {
  buttonType: string;
}

// The amount of milliseconds that allows another click to add the shape to favorites
const clickCooldown = 500;

function ShapeButton(props: ShapeButtonProps) {
  const selectedColor = useSelector(
    (state: RootState) => state.controls.color1
  );
  const buttonData = {
    type: props.buttonType,
    color: selectedColor,
  };
  const buttonHtml = getShapeHtml(buttonData);
  const selectedShape = useSelector(
    (state: RootState) => state.controls.shapeTool
  );
  const isClicked = useRef(false);
  const selected = props.buttonType === selectedShape;
  const dispatch = useDispatch();

  function handleClick() {
    if (!isClicked.current) {
      dispatch(selected ? deselectTool() : selectShapeTool(props.buttonType));
      isClicked.current = true;
      setTimeout(() => (isClicked.current = false), clickCooldown);
    } else {
      // Add logic to add shape to favorites here
    }
  }

  return (
    <div
      className={
        "shape-button trigger-clickaway" + (selected ? " selected" : "")
      }
      onClick={handleClick}
    >
      {buttonHtml}
    </div>
  );
}

export default ShapeButton;
