import { ChangeEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../../state/slices/shapeSlice";
import { RootState } from "../../state/store";
import { convertRgbToHex, getShapeData } from "../../helpers";
import { updateShape } from "../../state/slices/pageSlice";

interface ColorButtonProps {
  hue?: string;
  accent: string;
  topRow: boolean;
}

const hues = [
  "pink",
  "red",
  "deep-orange",
  "orange",
  "amber",
  "yellow",
  "lime",
  "light-green",
  "green",
  "teal",
  "cyan",
  "light-blue",
  "blue",
  "indigo",
  "deep-purple",
  "purple",
  "blue-grey",
  "grey",
  "brown",
];
const accents = [
  "",
  "darken-4",
  "darken-3",
  "darken-2",
  "darken-1",
  "lighten-1",
  "lighten-2",
  "lighten-3",
  "lighten-4",
  "lighten-5",
];

function ColorPickerWindow() {
  const dispatch = useDispatch();
  const selectedShapes = useSelector(
    (state: RootState) => state.shapes.selectedShapes
  );
  let selectedColor = useSelector((state: RootState) => state.shapes.color1);

  // A short cooldown for setting the color input which significantly improves performance
  const isCooldownRef = useRef(true);

  if (selectedShapes.length === 1) {
    const shapeData = getShapeData(selectedShapes[0]);
    if (shapeData) {
      selectedColor = shapeData.color;
    }
  }
  if (selectedColor.includes("rgb")) {
    selectedColor = convertRgbToHex(selectedColor);
  }

  function handleColorUpdate(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement).value;

    if (isCooldownRef.current) {
      isCooldownRef.current = false;
      setTimeout(() => (isCooldownRef.current = true));
      if (selectedShapes.length > 0) {
        for (let id of selectedShapes) {
          const data = getShapeData(id);
          if (!data) continue;
          const updateData = {
            props: {
              color: value,
            },
          };
          dispatch(updateShape([data.layer, data.index, updateData]));
        }
        return;
      }
      dispatch(setColor([1, value]));
    }
  }

  return (
    <>
      <div className="color-grid">
        {accents.map((accent, index) => (
          <ColorPickerRow
            accent={accent}
            topRow={index === 0}
            key={accent}
          ></ColorPickerRow>
        ))}
      </div>
      <div className="custom-color">
        <span>Custom:</span>
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorUpdate}
        />
      </div>
    </>
  );
}

function ColorPickerRow(props: ColorButtonProps) {
  return (
    <>
      {hues.map((hue) => (
        <ColorButton
          hue={hue}
          accent={props.accent}
          topRow={props.topRow}
          key={`${hue}-${props.accent}`}
        ></ColorButton>
      ))}
    </>
  );
}

function ColorButton(props: ColorButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const selectedShapes = useSelector(
    (state: RootState) => state.shapes.selectedShapes
  );
  const dispatch = useDispatch();

  function updateColor() {
    if (buttonRef.current) {
      // Find the background color of the button that was pressed
      const buttonStyles = window.getComputedStyle(buttonRef.current);
      const buttonColor = buttonStyles.getPropertyValue("background-color");

      if (selectedShapes.length > 0) {
        for (let id of selectedShapes) {
          const data = getShapeData(id);
          if (!data) continue;
          const updateData = {
            props: {
              color: buttonColor,
            },
          };
          dispatch(updateShape([data.layer, data.index, updateData]));
        }
        return;
      }
      dispatch(setColor([1, buttonColor]));
    }
  }

  let className = "plain clickable trigger-clickaway";
  if (props.hue) {
    className += ` ${props.hue}`;
  }
  if (props.accent) {
    className += ` ${props.accent}`;
  }
  if (props.topRow) {
    className += " top-row";
  }
  return (
    <button
      className={className}
      ref={buttonRef}
      onClick={updateColor}
    ></button>
  );
}

export default ColorPickerWindow;
