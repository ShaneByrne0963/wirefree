import VectorGraphic, { iconData } from "../../VectorGraphic";

// The type of shape group tabs
export const shapeGroupNames = [
  "favorites",
  "shapes",
  "components",
  "icons",
  "emojis",
];

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
    <div
      id={"shape-group-" + props.type}
      className={
        "shape-group-button clickable" + (props.selected ? " selected" : "")
      }
      onClick={() => props.handleClick(props.index)}
    >
      {props.type === "favorites" && (
        <VectorGraphic color={iconColor} path={iconData.Star}></VectorGraphic>
      )}
      {props.type === "shapes" && (
        <VectorGraphic color={iconColor} path={iconData.Shapes}></VectorGraphic>
      )}
      {props.type === "components" && (
        <VectorGraphic
          color={iconColor}
          path={iconData.Components}
        ></VectorGraphic>
      )}
      {props.type === "icons" && (
        <VectorGraphic
          color={iconColor}
          path={iconData.Microphone}
        ></VectorGraphic>
      )}
      {props.type === "emojis" && (
        <VectorGraphic
          color={iconColor}
          path={iconData.Smiling}
        ></VectorGraphic>
      )}
    </div>
  );
}

export default ShapeGroups;
