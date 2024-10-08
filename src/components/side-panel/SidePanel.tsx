import PageName from "./PageName";
import ScreenSelect from "./ScreenSelect";

function SidePanel() {
  return (
    <div id="side-panel" className="red lighten-3">
      <PageName></PageName>
      <ScreenSelect></ScreenSelect>
    </div>
  );
}

export default SidePanel;
