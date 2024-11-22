const shapeGroupNames = ["shapes", "components", "icons", "emojis"];

interface ShapeGroupButtonProps {
  type: string;
  selected: boolean;
}

function ShapeGroups() {
  const selectedGroup = 0;
  return (
    <div id="shape-groups">
      {shapeGroupNames.map((shape, index) => (
        <ShapeGroupButton
          key={index}
          type={shape}
          selected={index === selectedGroup}
        ></ShapeGroupButton>
      ))}
    </div>
  );
}

function ShapeGroupButton(props: ShapeGroupButtonProps) {
  return (
    <a
      role="button"
      id={"shape-group-" + props.type}
      className={"shape-group-button" + (props.selected ? " selected" : "")}
    >
      {props.type === "shapes" && <div></div>}
    </a>
  );
}

export default ShapeGroups;
