import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import CanvasCreateShape from "./CanvasCreateShape";

interface CanvasProps {
  createPoint: number[];
}

function Canvas(props: CanvasProps) {
  const activeScreenSizes = useSelector(
    (state: RootState) => state.screenSize.activeScreens
  );
  const selectedScreenIndex = useSelector(
    (state: RootState) => state.screenSize.selectedScreen
  );
  const selectedScreenSize = activeScreenSizes[selectedScreenIndex];
  const ratio = selectedScreenSize.width / selectedScreenSize.height;
  const canvasCss = {
    "--aspect-ratio": ratio,
  } as React.CSSProperties;

  return (
    <div id="canvas" style={canvasCss} className="z-depth-2">
      {props.createPoint[0] >= 0 && <CanvasCreateShape></CanvasCreateShape>}
    </div>
  );
}

export default Canvas;
