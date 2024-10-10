import PageName from "./PageName";
import SidePanelWindow from "./ScreenSelect";

function SidePanel() {
  return (
    <div id="side-panel" className="red lighten-3">
      <PageName></PageName>
      <SidePanelWindow windowType="screen"></SidePanelWindow>
    </div>
  );
}

export default SidePanel;
