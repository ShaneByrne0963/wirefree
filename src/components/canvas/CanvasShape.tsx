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

function CanvasShape(props: ShapeProps) {
  const shapeHtml = getShapeHtml(props.props);
  return (
    <div className="canvas-shape" style={props.styles as CSSProperties}>
      {shapeHtml}
    </div>
  );
}

export default CanvasShape;
