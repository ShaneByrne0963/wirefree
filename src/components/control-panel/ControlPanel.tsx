import { iconData } from "../VectorGraphic";
import ControlPanelItem from "./ControlPanelItem";

function ControlPanel() {
  const panelItems = ["Cursor"];

  return (
    <div id="control-panel" className="z-depth-2">
      <ProjectName></ProjectName>
      {panelItems.map((item, index) => (
        <ControlPanelItem
          graphic={item as keyof typeof iconData}
          key={index}
          type="toolSelect"
        ></ControlPanelItem>
      ))}
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

export default ControlPanel;
