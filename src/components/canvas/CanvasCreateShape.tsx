import { useSelector } from "react-redux";
import { getShapeHtml, ShapeHtmlProps } from "../../shapes";
import { RootState } from "../../state/store";

interface CanvasCreateShapeProps {
  props: ShapeHtmlProps;
}

function CanvasCreateShape(props: CanvasCreateShapeProps) {
  const selectedTool = useSelector(
    (state: RootState) => state.controls.selectedTool
  );
  const shapeHtml = getShapeHtml(props.props);
  return (
    <div id="shape-create" className="invisible">
      {selectedTool === "Shapes" && shapeHtml}
    </div>
  );
}

export default CanvasCreateShape;
