import ColorPickerWindow from "../inputs/ColorPickerWindow";
import { iconData } from "../VectorGraphic";
import ControlPanelItem, { PanelItemType } from "./ControlPanelItem";
import ShapeSelector from "./Windows/ShapeSelector";

function ControlPanel() {
  const panelItems = [
    { graphic: "Cursor", type: "toolSelect" },
    { graphic: "Shapes", type: "toolSelect", options: ShapeSelector },
    { graphic: "Text", type: "toolSelect" },
    { graphic: "Fill", type: "toolSelect" },
    { graphic: "Dropper", type: "toolSelect" },
    "",
    { graphic: "Cut", type: "action" },
    { graphic: "Copy", type: "action" },
    { graphic: "Paste", type: "action" },
    "",
    { graphic: "Grid", type: "action" },
    "",
    { graphic: "Palette", type: "action", options: ColorPickerWindow },
  ];

  return (
    <div id="control-panel" className="z-depth-2">
      <ProjectName></ProjectName>
      {panelItems.map((item, index) => {
        return typeof item === "string" ? (
          <Divider key={index}></Divider>
        ) : (
          <ControlPanelItem
            graphic={item.graphic as keyof typeof iconData}
            key={index}
            type={item.type as PanelItemType}
            options={item.options as React.ComponentType}
          ></ControlPanelItem>
        );
      })}
    </div>
  );
}

function ProjectName() {
  return (
    <a role="button" id="project-name">
      New Project
    </a>
  );
}

function Divider() {
  return <div className="divider" aria-hidden></div>;
}

export default ControlPanel;
