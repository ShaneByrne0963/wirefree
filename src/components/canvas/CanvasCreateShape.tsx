import { getShapeHtml, ShapeHtmlProps } from "../../shapes";

interface CanvasCreateShapeProps {
  props: ShapeHtmlProps;
}

function CanvasCreateShape(props: CanvasCreateShapeProps) {
  const shapeHtml = getShapeHtml(props.props);
  return (
    <div id="shape-create" className="invisible">
      {shapeHtml}
    </div>
  );
}

export default CanvasCreateShape;
