import VectorGraphic, { iconData } from "./components/VectorGraphic";
import { convertDisplayToClassName } from "./helpers";

export interface ShapeHtmlProps {
  type: string;
  color: string;
  text?: string;
}

export function getShapeHtml(props: ShapeHtmlProps) {
  let shapeHtml = <></>;
  const typeClass = convertDisplayToClassName(props.type);
  if (props.type === "Shape:Text") {
    const shapeStyles = {
      color: props.color,
    };
    shapeHtml = (
      <div className="text" style={shapeStyles}>
        {props.text}
      </div>
    );
  } else if (props.type in iconData) {
    let path = iconData[props.type as keyof typeof iconData];
    shapeHtml = (
      <VectorGraphic
        path={path}
        color={props.color}
        className={"icon-" + typeClass}
      ></VectorGraphic>
    );
  } else {
    const shapeStyles = {
      backgroundColor: props.color,
    };
    shapeHtml = (
      <div className={"shape " + typeClass} style={shapeStyles}></div>
    );
  }
  return shapeHtml;
}
