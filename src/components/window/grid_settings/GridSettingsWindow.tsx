import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { ChangeEvent } from "react";
import { setGridStatus } from "../../../state/slices/shapeSlice";
import { Axis } from "../../../context";
import { WindowActionButtons } from "../Window";

interface GridPropertyProps {
  label: string;
  axis: Axis;
}

function GridSettingsWindow() {
  const dispatch = useDispatch();
  const gridData = useSelector((state: RootState) => state.shapes.grid);

  function handleGridStatus(event: ChangeEvent<HTMLInputElement>) {
    const enabled = event.target.checked;
    dispatch(setGridStatus(enabled));
  }

  return (
    <>
      <label>
        <input
          type="checkbox"
          onChange={handleGridStatus}
          checked={gridData.enabled}
        />
        <span>Enable Grid</span>
      </label>
      <fieldset className="grid-properties">
        <legend>Grid Properties</legend>
        <GridProperty label="Width" axis="x"></GridProperty>
        <GridProperty label="Height" axis="y"></GridProperty>
      </fieldset>
      <WindowActionButtons
        close
        windowLabel="Grid Settings"
      ></WindowActionButtons>
    </>
  );
}

const unitOptions = [
  { label: "Pixels", value: "px" },
  { label: "%", value: "%" },
  { label: "Cells", value: "cells" },
];

function GridProperty(props: GridPropertyProps) {
  return (
    <div className="grid-property">
      <label>{props.label}</label>
      <div className="input-inline">
        <input type="number" min="1" max="9999" />
        <select className="browser-default">
          {unitOptions.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default GridSettingsWindow;
