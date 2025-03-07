import { useRef } from "react";
import { useDispatch } from "react-redux";
import { openMenu } from "../../state/slices/menuSlice";
import ProjectLoader from "../inputs/ProjectLoader";

const navHeight = 32;

interface NavButtonProps {
  name: string;
  color: string;
  items: string[];
}

function NavBar() {
  const navItems = {
    File: [
      "New Project",
      "Load Project",
      "Save Project",
      "Divider",
      "Export Page",
      "Export All Pages",
    ],
  };
  return (
    <nav id="nav-bar" className="grey darken-2">
      <div className="nav-wrapper">
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          {Object.keys(navItems).map((key, index) => (
            <NavButton
              color="grey"
              name={key}
              key={index}
              items={navItems[key as keyof typeof navItems]}
            ></NavButton>
          ))}
        </ul>
      </div>
      <ProjectLoader></ProjectLoader>
    </nav>
  );
}

function NavButton(props: NavButtonProps) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLAnchorElement | null>(null);

  function handleClick() {
    if (ref.current) {
      dispatch(
        openMenu({
          items: props.items,
          x: 0,
          y: navHeight,
        })
      );
    }
  }
  return (
    <li>
      <a
        role="button"
        className="grey-text text-lighten-5"
        onClick={handleClick}
        ref={ref}
      >
        {props.name}
      </a>
    </li>
  );
}

export default NavBar;
