import { CSSProperties } from "react";
import { getShapeHtml, ShapeHtmlProps } from "../../shapes";
import { useDispatch, useSelector } from "react-redux";
import { deselectAllShapes, selectShape } from "../../state/slices/shapeSlice";
import { RootState } from "../../state/store";

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
  const selectedTool = useSelector(
    (state: RootState) => state.shapes.selectedTool
  );
  const dispatch = useDispatch();

  function handleClick() {
    if (selectedTool === "") {
      dispatch(deselectAllShapes());
      dispatch(selectShape(props.id));
    }
  }

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
      onClick={handleClick}
    >
      {shapeHtml}
    </div>
  );
}

export default CanvasShape;
