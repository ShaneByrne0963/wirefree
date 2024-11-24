import VectorGraphic, * as vg from "./components/VectorGraphic";
import { convertDisplayToClassName } from "./helpers";

const iconData = {
  // Web Icons
  User: vg.pathUser,
  File: vg.pathFile,
  Envelope: vg.pathEnvelope,
  Phone: vg.pathPhone,
  "Magnifying Glass": vg.pathMagnifyingGlass,
  Gear: vg.pathGear,
  Image: vg.pathImage,
  Bell: vg.pathBell,
  "Bell Off": vg.pathBellOff,
  Camera: vg.pathCamera,
  Microphone: vg.pathMicrophone,
  Trash: vg.pathTrash,

  // Brands
  Copyright: vg.pathCopyright,
  Google: vg.pathGoogle,
  "Apple (Brand)": vg.pathAppleBrand,
  Windows: vg.pathWindows,
  Facebook: vg.pathFacebook,
  YouTube: vg.pathYouTube,
  Instagram: vg.pathInstagram,
  WhatsApp: vg.pathWhatsApp,
  LinkedIn: vg.pathLinkedIn,
  GitHub: vg.pathGitHub,
  Slack: vg.pathSlack,
  "Google Drive": vg.pathGoogleDrive,
};

export interface ShapeHtmlProps {
  type: string;
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
