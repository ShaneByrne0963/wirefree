import VectorGraphic, {
  pathComponents,
  pathEmojis,
  pathIcons,
  pathShapes,
} from "../../VectorGraphic";

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
  const iconColor = "rgba(0, 0, 0, 0.6)";
  return (
    <a
      role="button"
      id={"shape-group-" + props.type}
      className={"shape-group-button" + (props.selected ? " selected" : "")}
    >
      {props.type === "shapes" && (
        <VectorGraphic color={iconColor} path={pathShapes}></VectorGraphic>
      )}
      {props.type === "components" && (
        <VectorGraphic color={iconColor} path={pathComponents}></VectorGraphic>
      )}
      {props.type === "icons" && (
        <VectorGraphic color={iconColor} path={pathIcons}></VectorGraphic>
      )}
      {props.type === "emojis" && (
        <VectorGraphic color={iconColor} path={pathEmojis}></VectorGraphic>
      )}
    </a>
  );
}

export default ShapeGroups;
