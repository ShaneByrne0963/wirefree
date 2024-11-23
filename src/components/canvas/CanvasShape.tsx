import { CSSProperties } from "react";

export interface ShapeProps {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface CanvasShapeProps {
  props: ShapeProps;
}

function CanvasShape(props: CanvasShapeProps) {
  return (
    <div className="canvas-shape" style={props.props as CSSProperties}></div>
  );
}

export default CanvasShape;
