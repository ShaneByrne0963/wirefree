import { MouseEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../../state/slices/menuSlice";

interface MenuProps {
  index: number;
  items: string[];
}

function Menu(props: MenuProps) {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Each action the menu can perform
  const actions = {
    "New Project": () => console.log("New Project"),
    "Load Project": () => console.log("Load Project"),
    "Save Project": () => console.log("Save Project"),
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
    <div className="menu z-depth-2" ref={menuRef}>
      {props.items.map((item, index) => (
        <a role="button" key={index} onClick={() => handleInsideClick(item)}>
          {item}
        </a>
      ))}
    </div>
  );
}

export default Menu;
