import VectorGraphic, { iconData } from "./components/VectorGraphic";
import { convertDisplayToClassName } from "./helpers";

export interface ShapeHtmlProps {
  type: string;
  color: string;
}

export function getShapeHtml(props: ShapeHtmlProps) {
  let shapeHtml = <></>;
  const typeClass = convertDisplayToClassName(props.type);
  if (props.type in iconData) {
    let path = iconData[props.type as keyof typeof iconData];
    shapeHtml = (
      <VectorGraphic
        path={path}
        color={props.color}
        className={"icon " + typeClass}
      ></VectorGraphic>
    );
  } else {
    shapeHtml = <div className={"shape " + typeClass}></div>;
  }
  return shapeHtml;
}
