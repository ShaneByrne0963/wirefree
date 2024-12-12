interface MenuProps {
  items: string[];
}

function Menu(props: MenuProps) {
  // Each action the menu can perform
  const actions = {
    "New Project": () => console.log("Hello World"),
  };

  return (
    <div className="menu z-depth-2">
      {props.items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}

export default Menu;
