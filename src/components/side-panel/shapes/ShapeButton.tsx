import { convertDisplayToClassName } from "../../../helpers";

interface ShapeButtonProps {
  buttonType: string;
}

function ShapeButton(props: ShapeButtonProps) {
  return (
    <div
      className={
        "shape-button shape-" + convertDisplayToClassName(props.buttonType)
      }
    ></div>
  );
}

export default ShapeButton;
