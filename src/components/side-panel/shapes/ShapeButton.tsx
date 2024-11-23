import { useDispatch, useSelector } from "react-redux";
import { convertDisplayToClassName } from "../../../helpers";
import VectorGraphic, { pathMicrophone } from "../../VectorGraphic";
import { RootState } from "../../../state/store";
import { selectShape } from "../../../state/slices/shapeSlice";

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

function ShapeButton(props: ShapeButtonProps) {
  const selectedButton = useSelector(
    (state: RootState) => state.shapes.selected
  );
  const dispatch = useDispatch();
  const insideHtml =
    props.buttonType in buttonHtml ? (
      buttonHtml[props.buttonType as keyof typeof buttonHtml]
    ) : (
      <div className="background-icon"></div>
    );
  return (
    <div
      className={
        "shape-button clickable shape-" +
        convertDisplayToClassName(props.buttonType) +
        (props.buttonType === selectedButton ? " selected" : "")
      }
      onClick={() => dispatch(selectShape(props.buttonType))}
    >
      {insideHtml}
    </div>
  );
}

export default ShapeButton;
