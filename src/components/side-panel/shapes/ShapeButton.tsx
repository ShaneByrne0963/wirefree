import { useDispatch, useSelector } from "react-redux";
import { convertDisplayToClassName } from "../../../helpers";
import VectorGraphic, { pathMicrophone } from "../../VectorGraphic";
import { RootState } from "../../../state/store";
import { deselectShape, selectShape } from "../../../state/slices/shapeSlice";
import { useRef } from "react";

interface ShapeButtonProps {
  buttonType: string;
}

const buttonColor = "rgba(0, 0, 0, 0.6)";
const buttonHtml = {
  Microphone: (
    <VectorGraphic
      path={pathMicrophone}
      color={buttonColor}
      className="icon"
    ></VectorGraphic>
  ),
};
// The amount of milliseconds that allows another click to add the shape to favorites
const clickCooldown = 500;

function ShapeButton(props: ShapeButtonProps) {
  const selectedButton = useSelector(
    (state: RootState) => state.shapes.selected
  );
  const isClicked = useRef(false);
  const selected = props.buttonType === selectedButton;
  const dispatch = useDispatch();
  const insideHtml =
    props.buttonType in buttonHtml ? (
      buttonHtml[props.buttonType as keyof typeof buttonHtml]
    ) : (
      <div className="background-icon"></div>
    );

  function handleClick() {
    if (!isClicked.current) {
      dispatch(selected ? deselectShape() : selectShape(props.buttonType));
      isClicked.current = true;
      setTimeout(() => (isClicked.current = false), clickCooldown);
    } else {
      // Add logic to add shape to favorites here
    }
  }

  return (
    <div
      className={
        "shape-button clickable shape-" +
        convertDisplayToClassName(props.buttonType) +
        (selected ? " selected" : "")
      }
      onClick={handleClick}
    >
      {insideHtml}
    </div>
  );
}

export default ShapeButton;
