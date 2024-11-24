import VectorGraphic, {
  pathEnvelope,
  pathFile,
  pathMagnifyingGlass,
  pathMicrophone,
  pathPhone,
} from "./components/VectorGraphic";
import { convertDisplayToClassName } from "./helpers";

const iconData = {
  File: pathFile,
  Envelope: pathEnvelope,
  Phone: pathPhone,
  "Magnifying Glass": pathMagnifyingGlass,
  Microphone: pathMicrophone,
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
    const path = iconData[props.type as keyof typeof iconData];

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
