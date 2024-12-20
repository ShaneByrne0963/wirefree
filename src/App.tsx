import NavBar from "./components/navbar/NavBar";
import SidePanel from "./components/side-panel/SidePanel";
import CanvasContainer from "./components/canvas/CanvasContainer";
import WindowContainer from "./components/window/Window";
import { ThemeContext } from "./context";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import Menu from "./components/inputs/Menu";
import ControlPanel from "./components/control-panel/ControlPanel";

const colorTheme = "red";

function App() {
  const menus = useSelector((state: RootState) => state.menu.menus);
  return (
    <ThemeContext.Provider value={colorTheme}>
      <NavBar></NavBar>
      <ControlPanel></ControlPanel>
      <SidePanel></SidePanel>
      <CanvasContainer></CanvasContainer>
      <WindowContainer></WindowContainer>
      {menus.map((menu, index) => (
        <Menu
          key={index}
          index={index}
          items={menu.items}
          x={menu.x}
          y={menu.y}
        ></Menu>
      ))}
    </ThemeContext.Provider>
  );
}

export default App;
