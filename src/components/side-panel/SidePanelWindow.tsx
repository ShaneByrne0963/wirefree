import { useContext, useState } from "react";
import SidePanelLabel from "./SidePanelLabel";
import { ThemeContext } from "../../context";
import ScreenSizeButton from "./ScreenSizeButton";

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
  canOverflow?: boolean;
  componentClick?: any;
};

type WindowComponentProps = {
  windowType: string;
  canOverflow: boolean;
  componentClick?: any;
};

///////// Components

function SidePanelWindow(props: SidePanelWindowProps) {
  const color = useContext(ThemeContext);
  let panelWindowHtml = (
    <>
      {props.label && (
        <SidePanelLabel color={color} text={props.label}></SidePanelLabel>
      )}
      <WindowComponent
        windowType={props.windowType}
        canOverflow={props.canOverflow === true}
        componentClick={props.componentClick}
      ></WindowComponent>
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
  const windowSize = windowSizes[props.windowType as keyof typeof windowSizes];
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div
      id={"window-" + props.windowType}
      className={"side-panel-window " + windowSize}
    >
      {props.canOverflow && (
        <div className="window-content-container">
          <ScreenSizeButton
            name="Desktop"
            width={1920}
            height={1080}
            selected={selectedIndex === 0}
            handler={() => {
              setSelectedIndex(0);
              props.componentClick(1920 / 1080);
            }}
          ></ScreenSizeButton>
          <ScreenSizeButton
            name="Tablet"
            width={1200}
            height={800}
            selected={selectedIndex === 1}
            handler={() => {
              setSelectedIndex(1);
              props.componentClick(1200 / 800);
            }}
          ></ScreenSizeButton>
          <ScreenSizeButton
            name="Mobile"
            width={768}
            height={1024}
            selected={selectedIndex === 2}
            handler={() => {
              setSelectedIndex(2);
              props.componentClick(768 / 1024);
            }}
          ></ScreenSizeButton>
        </div>
      )}
    </div>
  );
}

export default SidePanelWindow;
