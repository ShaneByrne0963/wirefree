import NavBar from "./components/navbar/NavBar";
import SidePanel from "./components/side-panel/SidePanel";
import CanvasContainer from "./components/canvas/CanvasContainer";
import WindowContainer from "./components/window/Window";
import { ThemeContext } from "./context";

const colorTheme = "red";

function App() {
  return (
    <ThemeContext.Provider value={colorTheme}>
      <NavBar></NavBar>
      <SidePanel></SidePanel>
      <CanvasContainer></CanvasContainer>
      <WindowContainer></WindowContainer>
    </ThemeContext.Provider>
  );
}

export default App;
