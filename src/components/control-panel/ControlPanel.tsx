import { useDispatch, useSelector } from "react-redux";
import ColorPickerWindow from "../inputs/ColorPickerWindow";
import { iconData } from "../VectorGraphic";
import ControlPanelItem, { PanelItemType } from "./ControlPanelItem";
import ShapeSelector from "./window/shapes/ShapeSelector";
import { RootState } from "../../state/store";
import { setProjectName, toggleGrid } from "../../state/slices/controlSlice";
import GridWindow from "./window/grid/GridWindow";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";

function ControlPanel() {
  const hasGrid = useSelector(
    (state: RootState) => state.controls.grid.enabled
  );
  const panelItems = [
    { graphic: "Cursor", type: "toolSelect" },
    { graphic: "Shapes", type: "toolSelect", options: ShapeSelector },
    { graphic: "Text", type: "toolSelect" },
    { graphic: "Fill", type: "toolSelect" },
    { graphic: "Dropper", type: "toolSelect" },
    "",
    { graphic: "Cut", type: "action" },
    { graphic: "Copy", type: "action" },
    { graphic: "Paste", type: "action" },
    "",
    {
      graphic: "Grid",
      type: "toggle",
      selectedFactor: hasGrid,
      toggleSelectedFactor: toggleGrid,
      options: GridWindow,
    },
    "",
    { graphic: "Palette", type: "action", options: ColorPickerWindow },
  ];

  return (
    <div id="control-panel" className="z-depth-2">
      <ProjectName></ProjectName>
      {panelItems.map((item, index) => {
        return typeof item === "string" ? (
          <Divider key={index}></Divider>
        ) : (
          <ControlPanelItem
            graphic={item.graphic as keyof typeof iconData}
            key={index}
            type={item.type as PanelItemType}
            options={item.options as React.ComponentType}
            selectedFactor={item.selectedFactor}
            toggleSelectedFactor={item.toggleSelectedFactor}
          ></ControlPanelItem>
        );
      })}
    </div>
  );
}

const projectNameLength = 30;
function ProjectName() {
  const { ref, isActive, handleClickInside } = useOutsideClick();
  const projectName = useSelector(
    (state: RootState) => state.controls.projectName
  );
  const [isValid, setIsValid] = useState(true);
  const nameInput = useRef(projectName);
  const dispatch = useDispatch();

  // Update the project name when the user clicks out of the input, if valid
  useEffect(() => {
    if (!isActive && isValid && nameInput.current !== projectName) {
      const cleanName = nameInput.current.trim();
      if (cleanName) {
        dispatch(setProjectName(cleanName));
      }
    }
    nameInput.current = projectName;
    setIsValid(true);
  }, [isActive]);

  function handleChange(event: React.ChangeEvent) {
    nameInput.current = (event.target as HTMLInputElement).value;
    let inputValid = true;

    // Ensure no invalid characters are allowed in the file name
    const cleanName = nameInput.current.replace(/[<>:"/\\|?*]/g, "");
    if (
      nameInput.current.trim().length > projectNameLength ||
      cleanName !== nameInput.current
    ) {
      inputValid = false;
    } else {
      const lastChar = cleanName[cleanName.length - 1];
      if (lastChar === ".") {
        inputValid = false;
      }
    }

    if (inputValid !== isValid) {
      setIsValid(inputValid);
    }
  }

  function handleFocus(event: React.FocusEvent) {
    (event.target as HTMLInputElement).select();
  }

  return (
    <a
      role="button"
      id="project-name-container"
      ref={ref}
      onClick={handleClickInside}
    >
      {isActive ? (
        <input
          type="text"
          id="project-name-input"
          className={
            "plain-input browser-default" + (isValid ? "" : " invalid")
          }
          defaultValue={projectName}
          maxLength={projectNameLength}
          onChange={handleChange}
          onFocus={handleFocus}
          autoFocus
        ></input>
      ) : (
        <span id="project-name">{projectName}</span>
      )}
    </a>
  );
}

function Divider() {
  return <div className="divider" aria-hidden></div>;
}

export default ControlPanel;
