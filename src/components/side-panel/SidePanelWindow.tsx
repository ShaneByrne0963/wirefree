import { useContext } from "react";
import SidePanelLabel from "./SidePanelLabel";
import { ThemeContext } from "../../context";

type SidePanelWindowProps = {
  windowType: string;
  label?: string;
};

type WindowComponentProps = {
  size: string;
};

function SidePanelWindow(props: SidePanelWindowProps) {
  const color = useContext(ThemeContext);
  let windowSize = "md";
  switch (props.windowType) {
    case "layers":
      windowSize = "lg";
      break;
    default:
      break;
  }
  return (
    <>
      {props.label && (
        <SidePanelLabel color={color} text={props.label}></SidePanelLabel>
      )}
      <WindowComponent size={windowSize}></WindowComponent>
    </>
  );
}

function WindowComponent(props: WindowComponentProps) {
  return (
    <div
      id="select-screen-window"
      className={"side-panel-window " + props.size}
    ></div>
  );
}

export default SidePanelWindow;
