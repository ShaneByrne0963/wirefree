import NavBar from "./components/navbar/NavBar";
import SidePanel from "./components/side-panel/SidePanel";
import CanvasContainer from "./components/canvas/CanvasContainer";
import WindowContainer from "./components/window/Window";
import { ThemeContext } from "./context";
import { useState } from "react";

const colorTheme = "red";

function App() {
  const [canvasRatio, setCanvasRatio] = useState(1920 / 1080);

  return (
    <ThemeContext.Provider value={colorTheme}>
      <NavBar></NavBar>
      <SidePanel setCanvasRatiofunc={setCanvasRatio}></SidePanel>
      <CanvasContainer canvasRatio={canvasRatio}></CanvasContainer>
      <WindowContainer></WindowContainer>
    </ThemeContext.Provider>
  );
}

export default App;
