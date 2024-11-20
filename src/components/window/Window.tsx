import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { MouseEvent, useContext, useLayoutEffect, useState } from "react";
import { ThemeContext } from "../../context";
import { closeWindow } from "../../state/window/windowSlice";
import AddScreenSizeWindow from "./add_screen_size/AddScreenSizeWindow";
import PageSettingsWindow from "./page_settings/PageSettingsWindow";

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
  const isActive = useSelector((state: RootState) => state.window.active);
  const dispatch = useDispatch();

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.id === "window-container") {
      dispatch(closeWindow());
    }
  };

  return (
    <div
      id="window-container"
      className={isActive ? "active" : ""}
      onMouseDown={(event) => handleOutsideClick(event)}
    >
      <Window></Window>
    </div>
  );
}

function Window() {
  const color = useContext(ThemeContext);
  const dispatch = useDispatch();
  const label = useSelector((state: RootState) => state.window.label);
  const width = useSelector((state: RootState) => state.window.width);
  const collapsedWidth = useSelector(
    (state: RootState) => state.window.collapsedWidth
  );
  const windowWidth = useWindowWidth();

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
    <div id="window" className="z-depth-2" style={windowCss}>
      <div id="window-top" className={color + " lighten-2 z-depth-1"}>
        <span>{label}</span>
        <button className="close plain" onClick={() => dispatch(closeWindow())}>
          &times;
        </button>
      </div>
      <div id="window-body">
        {label === "Add Screen Size" && (
          <AddScreenSizeWindow divided={divided}></AddScreenSizeWindow>
        )}
        {label === "Page Settings" && <PageSettingsWindow></PageSettingsWindow>}
      </div>
    </div>
  );
}

interface WindowActionButtonProps {
  text: string;
  icon?: string;
  canSubmit: boolean;
  closeOnly?: boolean;
  action: () => void;
}

interface WindowCloseProps {
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
        onClick={() => dispatch(closeWindow())}
      >
        {"close" in props ? "Close" : "Cancel"}
      </button>
    </div>
  );
}

export default WindowContainer;
