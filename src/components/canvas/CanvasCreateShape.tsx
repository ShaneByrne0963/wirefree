import { convertDisplayToClassName } from "../../helpers";

interface CanvasCreateShapeProps {
  type: string;
}

function CanvasCreateShape(props: CanvasCreateShapeProps) {
  const classType = convertDisplayToClassName(props.type);
  return <div id="shape-create" className={"shape-" + classType}></div>;
}

export default CanvasCreateShape;
