import VectorGraphic, {
  pathComponents,
  pathEmojis,
  pathIcons,
  pathShapes,
} from "../../VectorGraphic";

const shapeGroupNames = ["shapes", "components", "icons", "emojis"];

interface ShapeGroupProps {
  selectedGroup: number;
  handleChangeGroup: (index: number) => void;
}

interface ShapeGroupButtonProps {
  type: string;
  index: number;
  selected: boolean;
  handleClick: (index: number) => void;
}

function ShapeGroups(props: ShapeGroupProps) {
  return (
    <div id="shape-groups">
      {shapeGroupNames.map((shape, index) => (
        <ShapeGroupButton
          key={index}
          index={index}
          type={shape}
          selected={index === props.selectedGroup}
          handleClick={props.handleChangeGroup}
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
      onClick={() => props.handleClick(props.index)}
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
