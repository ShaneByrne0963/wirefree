import { MouseEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../../state/slices/menuSlice";
import {
  ConfirmActionProps,
  confirmAction,
} from "../../state/slices/windowSlice";
import { saveProject } from "../../helpers";
import { RootState } from "../../state/store";
import { setExportingPages } from "../../state/slices/controlSlice";

interface MenuProps {
  index: number;
  items: string[];
  x: number;
  y: number;
}

function Menu(props: MenuProps) {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pageData = useSelector((state: RootState) => state.pages);
  const screenData = useSelector((state: RootState) => state.screenSize);
  const controlData = useSelector((state: RootState) => state.controls);

  const selectedScreen = useSelector(
    (state: RootState) => state.pages.selectedScreen
  );
  const selectedPage = pageData.pages[pageData.selectedPage].name;

  // Each action the menu can perform
  const actions = {
    "New Project": () => {
      const windowProps: ConfirmActionProps = {
        label: "Clear Current Project",
        bodyText: [
          "Are you sure you want to clear the current project?",
          "Any changes made will not be saved",
        ],
        buttonText: "Confirm",
        action: "newProject",
      };
      dispatch(confirmAction(windowProps));
    },
    "Load Project": () => document.getElementById("project-loader")?.click(),
    "Save Project": () => {
      const data = {
        name: controlData.projectName,
        version: "0.0.0",
        screenSizes: screenData,
        pages: pageData,
        grid: controlData.grid,
      };
      saveProject(data);
    },
    "Export Page": () =>
      dispatch(
        setExportingPages([{ screenSize: selectedScreen, page: selectedPage }])
      ),
    "Export All Pages": () => {
      console.log("Hello World");
    },
  };

  // Set the position of the menu
  const styles = {
    left: props.x,
    top: props.y,
  };

  function triggerClose() {
    if (menuRef.current) {
      menuRef.current.classList.remove("active");
      menuRef.current.addEventListener("transitionend", () =>
        dispatch(closeMenu(props.index))
      );
    }
  }

  function handleOutsideClick(event: Event | MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      triggerClose();
    }
  }

  function handleInsideClick(action: string) {
    actions[action as keyof typeof actions]();
    triggerClose();
  }

  useEffect(() => {
    // Trigger the opening animation
    setTimeout(() => {
      if (menuRef.current) {
        menuRef.current.classList.add("active");
      }
    });

    // Add the event listener to click away
    setTimeout(() => document.addEventListener("click", handleOutsideClick));

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="menu z-depth-2" ref={menuRef} style={styles}>
      {props.items.map((data, index) => {
        if (data === "Divider") {
          return <hr key={index}></hr>;
        }
        return (
          <a role="button" key={index} onClick={() => handleInsideClick(data)}>
            {data}
          </a>
        );
      })}
    </div>
  );
}

export default Menu;
