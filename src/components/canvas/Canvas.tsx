import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

function Canvas() {
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
  return <div id="canvas" style={canvasCss} className="z-depth-2"></div>;
}

export default Canvas;
