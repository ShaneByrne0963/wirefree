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
    Shapes: ["Rectangle", "Round Rectangle", "Circle", "Heart", "Star"],
  },
  components: {
    Components: [],
  },
  icons: {
    "Web Icons": [
      "User",
      "File",
      "Envelope",
      "Message",
      "Phone",
      "Magnifying Glass",
      "Bookmark",
      "Menu",
      "Options (Horizontal)",
      "Options (Vertical)",
      "List",
      "Gear",
      "Image",
      "Calendar",
      "Clock",
      "Clipboard",
      "Bell",
      "Bell Off",
      "Location",
      "SD Card",
      "Camera",
      "Video",
      "Microphone",
      "Credit Card",
      "Cut",
      "Copy",
      "Paste",
      "Trash",
    ],
    "Symbols/Signs": [
      "Dollar",
      "Euro",
      "Sterling",
      "Swap",
      "Rotate",
      "Shuffle",
      "Refresh",
      "Yes",
      "No",
      "Play",
      "Pause",
      "Power",
    ],
    Brands: [
      "Copyright",
      "Google",
      "Apple (Brand)",
      "Windows",
      "Facebook",
      "YouTube",
      "Instagram",
      "WhatsApp",
      "LinkedIn",
      "GitHub",
      "Slack",
      "Google Drive",
    ],
    "Other Icons": [
      "Locked",
      "Unlocked",
      "Hourglass",
      "Save",
      "Wrench",
      "Barcode",
      "Paper Clip",
      "Flag",
      "Earth",
      "Fire",
      "Skull",
      "Palette",
      "Snowflake",
      "Light Bulb",
    ],
  },
  emojis: {
    Emojis: [
      "Smiling",
      "Smiling (Wink)",
      "Smiling (Happy)",
      "Grinning",
      "Grinning (Wink)",
      "Grinning (Happy)",
      "Grinning (Squint)",
      "Grinning (Hearts)",
      "Grinning (Stars)",
      "Grinning (Sweat)",
      "Grinning (Tears)",
      "Grinning (Tears, Side)",
      "Grinning (Wide)",
      "Laughing",
      "Laughing (Wink)",
      "Laughing (Happy)",
      "Laughing (Squint)",
      "Tongue",
      "Tongue (Wink)",
      "Tongue (Squint)",
      "Kissing",
      "Kissing (Happy)",
      "Kissing (Heart)",
      "Meh",
      "Blank",
      "Surprised",
      "Shocked",
      "Rolling Eyes",
      "Tired",
      "Dizzy",
      "Sad",
      "Sad (Tear)",
      "Frown",
      "Crying",
      "Angry",
    ],
    "Hand Gestures": [],
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
