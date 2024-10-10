import PageName from "./PageName";
import SidePanelWindow from "./SidePanelWindow";
import ShapePalette from "./ShapePalette";
import { useContext } from "react";
import { ThemeContext } from "../../context";

function SidePanel() {
  const color = useContext(ThemeContext);
  return (
    <div id="side-panel" className={color + " lighten-3"}>
      <PageName></PageName>
      <SidePanelWindow windowType="screen" label="Screen"></SidePanelWindow>
      <SidePanelWindow windowType="layers" label="Layers"></SidePanelWindow>
      <ShapePalette color={color}></ShapePalette>
    </div>
  );
}

export default SidePanel;
