import { useContext } from "react";
import { ThemeContext } from "../../context";

function NavBar() {
  const color = useContext(ThemeContext);
  return (
    <nav id="nav-bar" className={color + " lighten-2"}>
      <div className="nav-wrapper">
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li>
            <a href="#" className={color + "-text text-lighten-5"}>
              File
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
