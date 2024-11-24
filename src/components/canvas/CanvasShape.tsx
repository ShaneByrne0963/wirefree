import { CSSProperties } from "react";
import { convertDisplayToClassName } from "../../helpers";

export interface ShapeStyles {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ShapeProps {
  styles: ShapeStyles;
  type: string;
}

function CanvasShape(props: ShapeProps) {
  const typeClass = convertDisplayToClassName(props.type);
  return (
    <div
      className={"canvas-shape shape-" + typeClass}
      style={props.styles as CSSProperties}
    ></div>
  );
}

export default CanvasShape;
