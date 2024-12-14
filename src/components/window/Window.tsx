import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import {
  MouseEvent,
  TransitionEvent,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ThemeContext } from "../../context";
import {
  WindowMessageState,
  WindowState,
  closeWindow,
  setWindowActive,
} from "../../state/slices/windowSlice";
import AddScreenSizeWindow from "./add_screen_size/AddScreenSizeWindow";
import PageSettingsWindow from "./page_settings/PageSettingsWindow";
import ConfirmAction from "./WindowMessage";
import GridSettingsWindow from "./grid_settings/GridSettingsWindow";

interface WindowProps {
  window: WindowState | WindowMessageState;
  index: number;
}

/**
 * Updates the window size on window resize
 * @returns The width of the window
 */
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return windowWidth;
}

function WindowContainer() {
  const windows = useSelector((state: RootState) => state.window.windows);
  return (
    <div id="window-container">
      {windows.map((window, index) => (
        <Window key={index} window={window} index={index}></Window>
      ))}
    </div>
  );
}

function Window(props: WindowProps) {
  const color = useContext(ThemeContext);
  const dispatch = useDispatch();
  const active = props.window.active;
  const label = props.window.label;
  const width = props.window.width;
  const collapsedWidth = props.window.collapsedWidth;
  const windowWidth = useWindowWidth();

  // Begin the fade in animation
  useEffect(() => {
    setTimeout(() => dispatch(setWindowActive([label, true])));
  }, []);

  // Allows for outside clicks to close the window
  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("window-screen-overlay")) {
      dispatch(setWindowActive([label, false]));
    }
  };

  // Deletes the window when it fades out
  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    // Make sure the animation is coming from the window
    const target = event.target as HTMLElement;
    if (target.classList.contains("window") && !active) {
      dispatch(closeWindow(label));
    }
  };

  const divided = width < windowWidth - 32;

  type CssProperties = {
    "--width": string;
    "--collapsed-width"?: string;
  };
  let cssObject: CssProperties = {
    "--width": `${width}px`,
  };
  if (collapsedWidth) {
    cssObject["--collapsed-width"] = `${collapsedWidth}px`;
  }
  const windowCss = cssObject as React.CSSProperties;

  return (
    <div className="window-screen-overlay" onMouseDown={handleOutsideClick}>
      <div
        className={(active ? "active " : "") + "window z-depth-2"}
        style={windowCss}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className={color + " window-top lighten-2 z-depth-1"}>
          <span>{label}</span>
          <button
            className="close plain"
            onClick={() => dispatch(setWindowActive([label, false]))}
          >
            &times;
          </button>
        </div>
        <div className="window-body">
          {label === "Add Screen Size" && (
            <AddScreenSizeWindow divided={divided}></AddScreenSizeWindow>
          )}
          {label === "Page Settings" && (
            <PageSettingsWindow></PageSettingsWindow>
          )}
          {label === "Grid Settings" && (
            <GridSettingsWindow></GridSettingsWindow>
          )}
          {"bodyText" in props.window && (
            <ConfirmAction
              label={props.window.label}
              bodyText={props.window.bodyText}
              buttonText={props.window.buttonText}
              action={props.window.action}
              parameter={props.window.parameter}
            ></ConfirmAction>
          )}
        </div>
      </div>
    </div>
  );
}

interface WindowActionButtonProps {
  text: string;
  icon?: string;
  canSubmit: boolean;
  closeOnly?: boolean;
  windowLabel: string;
  action: () => void;
}

interface WindowCloseProps {
  windowLabel: string;
  close: true;
}

export function WindowActionButtons(
  props: WindowActionButtonProps | WindowCloseProps
) {
  const dispatch = useDispatch();

  return (
    <div className="window-buttons">
      {!("close" in props) && (
        <button
          className="btn waves-effect waves-light btn-small"
          onClick={props.action}
          disabled={!props.canSubmit}
        >
          {props.text}
          {props.icon && <i className="material-icons right">{props.icon}</i>}
        </button>
      )}
      <button
        className="btn btn-cancel waves-effect waves-light btn-small"
        onClick={() => dispatch(setWindowActive([props.windowLabel, false]))}
      >
        {"close" in props ? "Close" : "Cancel"}
      </button>
    </div>
  );
}

export default WindowContainer;
