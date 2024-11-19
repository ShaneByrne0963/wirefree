import NavBar from "./components/navbar/NavBar";
import SidePanel from "./components/side-panel/SidePanel";
import CanvasContainer from "./components/canvas/CanvasContainer";
import WindowContainer from "./components/window/Window";
import { ThemeContext } from "./context";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

const colorTheme = "red";
// If the user clicks away from any of these elements, a function clickAway in the referenced slice is called
const closeOnClickAway = [{ parent: "#page-list-dropdown", slice: "pages" }];

function App() {
  // A state that is updated whenever the mouse is clicked
  const [clickedElement, handleClick] = useState<Element>(document.body);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const target = event.target;

      if (target instanceof Element) {
        handleClick(target);
      }
    });
  }, []);

  useEffect(() => {
    if (clickedElement) {
      for (let data of closeOnClickAway) {
        if (!clickedElement.closest(data.parent)) {
          // const targetData = useSelector(
          //   (state: RootState) => state[data.slice as keyof RootState]
          // );
          // console.log(targetData);
        }
      }
    }
  }, [clickedElement]);

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
