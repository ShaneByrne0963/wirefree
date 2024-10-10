import PageName from "./PageName";
import SidePanelWindow from "./SidePanelWindow";

function SidePanel() {
  return (
    <div id="side-panel" className="red lighten-3">
      <PageName></PageName>
      <SidePanelWindow windowType="screen" label="Screen"></SidePanelWindow>
      <SidePanelWindow windowType="layers" label="Layers"></SidePanelWindow>
    </div>
  );
}

export default SidePanel;
