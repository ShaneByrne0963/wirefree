import { ChangeEvent, CSSProperties, useEffect, useRef } from "react";
import { ShapeProps } from "./CanvasShape";
import { useDispatch } from "react-redux";
import { updateShape } from "../../state/slices/pageSlice";

import sanitizeHtml from "sanitize-html";
import {
  deselectAllShapes,
  selectShape,
} from "../../state/slices/controlSlice";

interface TextLocalProps extends ShapeProps {
  id: string;
  layer: string;
  index: number;
  selected: boolean;
  active: boolean;
}

function CanvasText(props: TextLocalProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const textStyles = {
    left: `${props.styles.left}px`,
    top: `${props.styles.top}px`,
    width: `${props.styles.width}px`,
    height: `${props.styles.height}px`,
    color: props.props.color,
  };

  function handleBlur(event: ChangeEvent) {
    const element = event.target as HTMLDivElement;
    const value = element.innerHTML;

    const newData = {
      props: {
        text: sanitizeHtml(value),
      },
    };
    dispatch(updateShape([props.layer, props.index, newData]));
  }

  // Automatically select the text element on creation
  useEffect(() => {
    if (!props.props.text) {
      dispatch(deselectAllShapes());
      setTimeout(() => {
        dispatch(selectShape(props.id));
        ref.current?.focus();
      });
    }
  }, []);

  let className = "canvas-element canvas-text";
  if (props.selected || props.props.text === "") {
    className += " selected";
  }
  if (!props.active) {
    className += " inactive";
  }

  return (
    <div
      className={className}
      id={props.id}
      style={textStyles as CSSProperties}
      data-layer={props.layer}
      data-index={props.index}
      contentEditable={props.selected}
      onBlur={handleBlur}
      ref={ref}
      dangerouslySetInnerHTML={{ __html: props.props.text || "" }}
    ></div>
  );
}

export default CanvasText;
