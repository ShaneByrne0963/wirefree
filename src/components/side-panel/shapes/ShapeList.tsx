import ShapeButton from "./ShapeButton";
import { shapeGroupNames } from "./ShapeGroups";

interface ShapeListProps {
  tab?: number;
}

interface ShapeGridProps {
  heading: string;
  values: string[];
}

// Stores the organization of shapes into different groups
type shapeListsType = {
  [key: string]: { [key: string]: string[] };
};
const shapeLists: shapeListsType = {
  favorites: {
    "Your Favourites": [],
    Recent: [],
  },
  shapes: {
    Shapes: ["Rectangle", "Round Rectangle", "Circle"],
  },
  components: {
    Components: [],
  },
  icons: {
    "Web Icons": [
      "File",
      "Envelope",
      "Phone",
      "Magnifying Glass",
      "Microphone",
    ],
  },
  emojis: {
    Emojis: [],
  },
};

function ShapeList(props: ShapeListProps) {
  const tab = props.tab || 0;
  const group = shapeGroupNames[tab];
  const list = shapeLists[group as keyof typeof shapeLists];
  const keys: string[] = Object.keys(list);

  return (
    <div id="shape-list">
      {keys.map((key, index) => (
        <ShapeGrid
          key={index}
          heading={key}
          values={list[key as keyof typeof list]}
        ></ShapeGrid>
      ))}
    </div>
  );
}

function ShapeGrid(props: ShapeGridProps) {
  return (
    <>
      <div className="shape-list-heading">{props.heading}</div>
      <div className="shape-grid">
        {props.values.map((item, index) => (
          <ShapeButton key={index} buttonType={item}></ShapeButton>
        ))}
      </div>
    </>
  );
}

export default ShapeList;
