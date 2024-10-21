import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useContext } from "react";
import { ThemeContext } from "../context";
import { closeWindow } from "../state/window/WindowSlice";

function WindowContainer() {
  const isActive = useSelector((state: RootState) => state.window.active);
  console.log(isActive);

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
  const height = useSelector((state: RootState) => state.window.height);

  const windowCss = {
    "--width": `${width}px`,
    "--height": `${height}px`,
  } as React.CSSProperties;

  return (
    <div id="window" className="z-depth-2" style={windowCss}>
      <div id="window-top" className={color + " lighten-2 z-depth-1"}>
        <span>{label}</span>
        <button className="close plain" onClick={() => dispatch(closeWindow())}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default WindowContainer;
