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

interface CanvasShapeProps extends ShapeProps {
  scale: number;
}

function CanvasShape(props: CanvasShapeProps) {
  const shapeHtml = getShapeHtml(props.props);
  const shapeStyles = {
    left: `${props.styles.left * props.scale}px`,
    top: `${props.styles.top * props.scale}px`,
    width: `${props.styles.width * props.scale}px`,
    height: `${props.styles.height * props.scale}px`,
  };
  return (
    <div className="canvas-shape" style={shapeStyles as CSSProperties}>
      {shapeHtml}
    </div>
  );
}

export default CanvasShape;
