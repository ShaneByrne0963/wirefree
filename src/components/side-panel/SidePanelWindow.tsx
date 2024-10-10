import { useContext } from "react";
import SidePanelLabel from "./SidePanelLabel";
import { ThemeContext } from "../../context";

///////// Configuration

// The size of the window depending on the type
const windowSizes = {
  screen: "sm",
  layers: "lg",
};

///////// Property Types

type SidePanelWindowProps = {
  windowType: string;
  label?: string;
};

type WindowComponentProps = {
  windowType: string;
};

///////// Components

function SidePanelWindow(props: SidePanelWindowProps) {
  const color = useContext(ThemeContext);
  let panelWindowHtml = (
    <>
      {props.label && (
        <SidePanelLabel color={color} text={props.label}></SidePanelLabel>
      )}
      <WindowComponent windowType={props.windowType}></WindowComponent>
    </>
  );

  // If the window is accompanied by a label, then wrap the HTML in a div
  if (props.label) {
    return (
      <div id={"window-" + props.windowType + "-container"}>
        {panelWindowHtml}
      </div>
    );
  }
  return panelWindowHtml;
}

function WindowComponent(props: WindowComponentProps) {
  // Get the size of the window based on the type
  let windowSize = windowSizes[props.windowType as keyof typeof windowSizes];
  return (
    <div
      id={"window-" + props.windowType}
      className={"side-panel-window " + windowSize}
    ></div>
  );
}

export default SidePanelWindow;
