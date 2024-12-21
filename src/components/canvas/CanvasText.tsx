import { ChangeEvent, CSSProperties } from "react";
import { ShapeProps } from "./CanvasShape";
import { useDispatch } from "react-redux";
import { updateShape } from "../../state/slices/pageSlice";

interface TextLocalProps extends ShapeProps {
  id: string;
  layer: string;
  index: number;
  selected: boolean;
}

function CanvasText(props: TextLocalProps) {
  const dispatch = useDispatch();
  const textStyles = {
    left: `${props.styles.left}px`,
    top: `${props.styles.top}px`,
    width: `${props.styles.width}px`,
    height: `${props.styles.height}px`,
  };

  function handleChange(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement).value;
    const newData = {
      props: {
        text: value,
      },
    };
    dispatch(updateShape([props.layer, props.index, newData]));
  }

  return (
    <div
      className={
        "canvas-element canvas-text" + (props.selected ? " selected" : "")
      }
      id={props.id}
      style={textStyles as CSSProperties}
      data-layer={props.layer}
      data-index={props.index}
    >
      {props.selected ? (
        <textarea onChange={handleChange} value={props.props.text}></textarea>
      ) : (
        props.props.text
      )}
    </div>
  );
}

export default CanvasText;
