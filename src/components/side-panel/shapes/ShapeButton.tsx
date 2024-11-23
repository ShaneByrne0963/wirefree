import { convertDisplayToClassName } from "../../../helpers";
import VectorGraphic, { pathMicrophone } from "../../VectorGraphic";

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
  const insideHtml =
    props.buttonType in buttonHtml ? (
      buttonHtml[props.buttonType as keyof typeof buttonHtml]
    ) : (
      <div className="background-icon"></div>
    );
  return (
    <div
      className={
        "shape-button shape-" + convertDisplayToClassName(props.buttonType)
      }
    >
      {insideHtml}
    </div>
  );
}

export default ShapeButton;
