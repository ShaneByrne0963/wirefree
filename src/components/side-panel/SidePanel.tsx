import PageName from "./PageName";
import SidePanelWindow from "./SidePanelWindow";
import ShapePalette from "./ShapePalette";
import { useContext } from "react";
import { ThemeContext } from "../../context";

interface Props {
  setCanvasRatiofunc: any;
}

function SidePanel(props: Props) {
  const color = useContext(ThemeContext);
  return (
    <div id="side-panel" className={color + " lighten-3"}>
      <PageName></PageName>
      <SidePanelWindow
        windowType="screen"
        label="Screen"
        canOverflow={true}
        componentClick={props.setCanvasRatiofunc}
      ></SidePanelWindow>
      <SidePanelWindow windowType="layers" label="Layers"></SidePanelWindow>
      <ShapePalette color={color}></ShapePalette>
    </div>
  );
}

export default SidePanel;
