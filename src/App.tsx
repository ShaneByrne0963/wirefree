import NavBar from "./components/navbar/NavBar";
import SidePanel from "./components/side-panel/SidePanel";
import CanvasContainer from "./components/canvas/CanvasContainer";
import { ThemeContext } from "./context";

const colorTheme = "red";

function App() {
  return (
    <ThemeContext.Provider value={colorTheme}>
      <NavBar></NavBar>
      <SidePanel></SidePanel>
      <CanvasContainer></CanvasContainer>
    </ThemeContext.Provider>
  );
}

export default App;
