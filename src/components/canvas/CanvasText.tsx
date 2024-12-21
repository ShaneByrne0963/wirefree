import { CSSProperties } from "react";
import { ShapeProps } from "./CanvasShape";

interface TextLocalProps extends ShapeProps {
  id: string;
  text: string;
  layer: string;
  index: number;
  selected: boolean;
}

function CanvasText(props: TextLocalProps) {
  const textStyles = {
    left: `${props.styles.left}px`,
    top: `${props.styles.top}px`,
    width: `${props.styles.width}px`,
    height: `${props.styles.height}px`,
  };
  return (
    <div
      className={"canvas-text" + (props.selected ? " selected" : "")}
      id={props.id}
      style={textStyles as CSSProperties}
      data-layer={props.layer}
      data-index={props.index}
      contentEditable
    >
      {props.text}
    </div>
  );
}

export default CanvasText;
