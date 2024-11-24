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
    let containerRatio = 1;
    if (props.width > 0 && props.height > 0) {
      containerRatio = props.width / props.height;
    }
    shapeHtml = (
      <VectorGraphic
        path={data.path}
        color={props.color}
        className={"icon " + typeClass}
        containerRatio={containerRatio}
      ></VectorGraphic>
    );
  } else {
    shapeHtml = <div className={"shape " + typeClass}></div>;
  }
  return shapeHtml;
}
