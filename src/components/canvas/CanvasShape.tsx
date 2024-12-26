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
  layer: string;
  index: number;
  selected: boolean;
  active: boolean;
}

function CanvasShape(props: ShapeLocalProps) {
  const shapeHtml = getShapeHtml(props.props);
  const shapeStyles = {
    left: `${props.styles.left}px`,
    top: `${props.styles.top}px`,
    width: `${props.styles.width}px`,
    height: `${props.styles.height}px`,
  };
  let className = "canvas-element canvas-shape";
  if (props.selected) {
    className += " selected";
  }
  if (!props.active) {
    className += " inactive";
  }
  return (
    <div
      className={className}
      id={props.id}
      style={shapeStyles as CSSProperties}
      data-layer={props.layer}
      data-index={props.index}
    >
      {shapeHtml}
    </div>
  );
}

export default CanvasShape;
