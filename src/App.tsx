import NavBar from './components/navbar/NavBar';
import SidePanel from './components/side-panel/SidePanel';

const colorTheme = "red";

function App() {
  return <>
    <NavBar color={colorTheme}></NavBar>
    <SidePanel color={colorTheme}></SidePanel>
  </>;
}

export default App
