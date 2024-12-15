import ControlPanelItem from "./ControlPanelItem";

function ControlPanel() {
  return (
    <div id="control-panel" className="z-depth-2">
      <ProjectName></ProjectName>
      <ControlPanelItem></ControlPanelItem>
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
