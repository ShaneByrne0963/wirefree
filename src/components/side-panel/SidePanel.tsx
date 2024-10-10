import PageName from "./PageName";
import SidePanelWindow from "./SidePanelWindow";
import ShapePalette from "./ShapePalette";

type SidePanelProps = {
  color: string;
};

function SidePanel(props: SidePanelProps) {
  return (
    <div id="side-panel" className={props.color + " lighten-3"}>
      <PageName></PageName>
      <SidePanelWindow windowType="screen" label="Screen" color={props.color}></SidePanelWindow>
      <SidePanelWindow windowType="layers" label="Layers" color={props.color}></SidePanelWindow>
      <ShapePalette color={props.color}></ShapePalette>
    </div>
  );
}

export default SidePanel;