import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useContext, useLayoutEffect, useState } from "react";
import { ThemeContext } from "../../context";
import { closeWindow } from "../../state/window/windowSlice";
import AddScreenSizeWindow from "./AddScreenSizeWindow";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return windowSize;
}

function WindowContainer() {
  const isActive = useSelector((state: RootState) => state.window.active);

  return (
    <div id="window-container" className={isActive ? "active" : ""}>
      <Window></Window>
    </div>
  );
}

function Window() {
  const color = useContext(ThemeContext);
  const dispatch = useDispatch();
  const label = useSelector((state: RootState) => state.window.label);
  const width = useSelector((state: RootState) => state.window.width);
  const [windowWidth, windowHeight] = useWindowSize();

  const divided = width < windowWidth - 32;

  const windowCss = {
    "--width": `${width}px`,
  } as React.CSSProperties;

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
      </div>
    </div>
  );
}

export default WindowContainer;
