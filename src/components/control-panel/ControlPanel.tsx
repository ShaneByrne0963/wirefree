import { useSelector } from "react-redux";
import ColorPickerWindow from "../inputs/ColorPickerWindow";
import { iconData } from "../VectorGraphic";
import ControlPanelItem, { PanelItemType } from "./ControlPanelItem";
import ShapeSelector from "./Windows/ShapeSelector";
import { RootState } from "../../state/store";
import { toggleGrid } from "../../state/slices/controlSlice";

function ControlPanel() {
  const hasGrid = useSelector(
    (state: RootState) => state.controls.grid.enabled
  );
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
    {
      graphic: "Grid",
      type: "toggle",
      selectedFactor: hasGrid,
      toggleSelectedFactor: toggleGrid,
    },
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
            selectedFactor={item.selectedFactor}
            toggleSelectedFactor={item.toggleSelectedFactor}
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
