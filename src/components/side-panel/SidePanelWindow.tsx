import { useContext } from "react";
import { RootState } from "../../state/store";
import SidePanelLabel from "./SidePanelLabel";
import { ThemeContext } from "../../context";
import ScreenSizeButton from "./ScreenSizeButton";
import AddScreenSize from "./AddScreenSize";
import { useDispatch, useSelector } from "react-redux";
import { selectScreenSize } from "../../state/screenSize/screenSizeSlice";

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
};

type WindowComponentProps = {
  windowType: string;
  canOverflow: boolean;
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
  const activeScreenSizes = useSelector(
    (state: RootState) => state.screenSize.activeScreens
  );
  const selectedIndex = useSelector(
    (state: RootState) => state.screenSize.selectedScreen
  );
  const dispatch = useDispatch();

  return (
    <div
      id={"window-" + props.windowType}
      className={"side-panel-window " + windowSize}
    >
      {props.canOverflow && (
        <div className="window-content-container">
          {activeScreenSizes.map((item, index) => {
            return (
              <ScreenSizeButton
                name={item.name}
                key={item.name}
                width={item.width}
                height={item.height}
                selected={selectedIndex === index}
                handler={() => {
                  dispatch(selectScreenSize(index));
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
