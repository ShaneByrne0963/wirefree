import { useDispatch, useSelector } from "react-redux";
import { getShapeHtml } from "../../shapes";
import { RootState } from "../../state/store";
import { iconData } from "../VectorGraphic";
import { selectShapeTool, setColor } from "../../state/slices/shapeSlice";
import { MouseEvent } from "react";
import { getShapeData } from "../../helpers";
import useOutsideClick from "../../hooks/useOutsideClick";
import ColorPickerWindow from "../inputs/ColorPickerWindow";
import { updateShape } from "../../state/slices/pageSlice";

export type PanelItemType = "toolSelect" | "action";

interface PanelItemProps {
  graphic: keyof typeof iconData;
  type: PanelItemType;
  disabled?: true;
}

interface PaletteDisplayProps {
  active: boolean;
}

function ControlPanelItem(props: PanelItemProps) {
  const selectedShapes = useSelector(
    (state: RootState) => state.shapes.selectedShapes
  );
  const onCloseFunctions = {
    Palette: () => {
      // Update the selected color only when the color picker window is closed for better performance
      const newColor =
        document.querySelector<HTMLElement>(".color-display")?.style
          .backgroundColor;
      if (!newColor) return;
      if (selectedShapes.length > 0) {
        for (let id of selectedShapes) {
          const data = getShapeData(id);
          if (!data) continue;
          const updateData = {
            props: {
              color: newColor,
            },
          };
          dispatch(updateShape([data.layer, data.index, updateData]));
        }
        return;
      }
      dispatch(setColor([1, newColor]));
    },
  };
  const activeClick = useOutsideClick(
    props.graphic in onCloseFunctions
      ? onCloseFunctions[props.graphic as keyof typeof onCloseFunctions]
      : undefined
  );
  // Remove for full release
  const unusableItems = ["Fill", "Dropper", "Cut", "Copy", "Paste"];

  const dispatch = useDispatch();
  const selectedShape = useSelector(
    (state: RootState) => state.shapes.selectedTool
  );
  const toolSelector = props.graphic === "Cursor" ? "" : props.graphic;
  const disabled = "disabled" in props || unusableItems.includes(props.graphic);

  function handleClick(event: MouseEvent) {
    if (props.type === "toolSelect") {
      dispatch(
        selectShapeTool(props.graphic === "Cursor" ? "" : props.graphic)
      );
    } else if (props.type === "action") {
      activeClick.handleClickInside();
      // Start an animation to show feedback that the user selected it
      const element = event.target as HTMLElement;
      if (!element) return;
      element.closest("a")?.classList.add("selected");
      setTimeout(() => element.closest("a")?.classList.remove("selected"), 80);
    }
  }

  let className = "control-panel-item " + props.type;
  if (disabled) {
    className += " disabled";
  } else if (selectedShape === toolSelector) {
    className += " selected";
  }
  const buttonData = {
    type: props.graphic,
    color: disabled ? "#999999" : "#343434",
  };
  const shapeHtml = getShapeHtml(buttonData);
  return (
    <a
      role="button"
      className={className}
      onClick={handleClick}
      ref={activeClick.ref}
    >
      {shapeHtml}
      {props.graphic === "Palette" && (
        <PaletteDisplay active={activeClick.isActive}></PaletteDisplay>
      )}
    </a>
  );
}

function PaletteDisplay(props: PaletteDisplayProps) {
  const shapeData = useSelector((state: RootState) => state.shapes);

  let colorPickerStyles = {};

  if (shapeData.selectedShapes.length === 0) {
    colorPickerStyles = {
      backgroundColor: shapeData.color1,
    };
  } else if (shapeData.selectedShapes.length === 1) {
    const selectedShape = getShapeData(shapeData.selectedShapes[0]);
    if (selectedShape) {
      colorPickerStyles = {
        backgroundColor: selectedShape.color,
      };
    }
  }

  return (
    <div className="color-display" style={colorPickerStyles} aria-hidden>
      {props.active && <ColorPickerWindow></ColorPickerWindow>}
    </div>
  );
}

export default ControlPanelItem;
