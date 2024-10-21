import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useContext } from "react";
import { ThemeContext } from "../context";

interface WindowContainerProps {
  status: string;
}

function WindowContainer(props: WindowContainerProps) {
  const windowType = useSelector((state: RootState) => state.window.type);

  return (
    <div id="window-container" className={windowType ? "active" : ""}>
      <Window></Window>
    </div>
  );
}

function Window() {
  const color = useContext(ThemeContext);
  const dispatch = useDispatch();
  return (
    <div id="window" className="z-depth-2">
      <div id="window-top" className={color + " lighten-2 z-depth-1"}></div>
    </div>
  );
}

export default WindowContainer;
