import { useContext, useState } from "react";
import SidePanelLabel from "./SidePanelLabel";
import { ThemeContext } from "../../context";
import ScreenSizeButton from "./ScreenSizeButton";
import AddScreenSize from "./AddScreenSize";

///////// Configuration

// The size of the window depending on the type
const windowSizes = {
  screen: "sm",
  layers: "lg",
};

// What screen sizes are displayed on page load
const defaultAppliedScreenSizes = [
  { name: "Desktop", width: 1920, height: 1080 },
  { name: "Tablet", width: 1200, height: 800 },
  { name: "Mobile", width: 768, height: 1024 },
];

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
          {defaultAppliedScreenSizes.map((item, index) => {
            return (
              <ScreenSizeButton
                name={item.name}
                key={item.name}
                width={item.width}
                height={item.height}
                selected={selectedIndex === index}
                handler={() => {
                  setSelectedIndex(index);
                  props.componentClick(item.width / item.height);
                }}
              ></ScreenSizeButton>
            );
          })}
          <AddScreenSize></AddScreenSize>
        </div>
      )}
    </div>
  );
}

export default SidePanelWindow;
