import VectorGraphic, { pathMicrophone } from "./components/VectorGraphic";
import { convertDisplayToClassName } from "./helpers";

const iconData = {
  Microphone: { path: pathMicrophone },
};

export interface ShapeHtmlProps {
  type: string;
  width: number;
  height: number;
  color: string;
}

export function getShapeHtml(props: ShapeHtmlProps) {
  let shapeHtml = <></>;
  const typeClass = convertDisplayToClassName(props.type);
  if (props.type in iconData) {
    const data = iconData[props.type as keyof typeof iconData];

    shapeHtml = (
      <VectorGraphic
        path={data.path}
        color={props.color}
        className={"icon " + typeClass}
      ></VectorGraphic>
    );
  } else {
    shapeHtml = <div className={"shape " + typeClass}></div>;
  }
  return shapeHtml;
}
