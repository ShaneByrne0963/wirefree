import { CSSProperties } from "react";
import { getShapeHtml, ShapeHtmlProps } from "../../shapes";

export interface ShapeStyles {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ShapeProps {
  styles: ShapeStyles;
  props: ShapeHtmlProps;
}

interface ShapeLocalProps extends ShapeProps {
  id: string;
  selected: boolean;
}

function CanvasShape(props: ShapeLocalProps) {
  const shapeHtml = getShapeHtml(props.props);
  const shapeStyles = {
    left: `${props.styles.left}px`,
    top: `${props.styles.top}px`,
    width: `${props.styles.width}px`,
    height: `${props.styles.height}px`,
  };
  return (
    <div
      className={"canvas-shape" + (props.selected ? " selected" : "")}
      id={props.id}
      style={shapeStyles as CSSProperties}
    >
      {shapeHtml}
    </div>
  );
}

export default CanvasShape;
