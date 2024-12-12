import { useEffect, useRef } from "react";
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
    "New Project": () => console.log("Hello World"),
  };

  function handleOutsideClick(event: Event) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      menuRef.current.classList.remove("active");
      menuRef.current.addEventListener("transitionend", () =>
        dispatch(closeMenu(props.index))
      );
    }
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
        <div key={index} onClick={actions[item as keyof typeof actions]}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default Menu;
