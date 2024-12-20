import { useDispatch, useSelector } from "react-redux";
import { Axis } from "../../../../context";
import { clamp } from "../../../../helpers";
import { RootState } from "../../../../state/store";
import {
  gridUnits,
  setGridProperty,
} from "../../../../state/slices/controlSlice";
import { useRef } from "react";

interface GridPropertyProps {
  label: string;
  axis: Axis;
}

function GridWindow() {
  return (
    <div className="grid-properties">
      <GridProperty label="Width" axis="x"></GridProperty>
      <GridProperty label="Height" axis="y"></GridProperty>
    </div>
  );
}

const unitOptions = [
  { label: "Pixels", value: "px" },
  { label: "%", value: "%" },
  { label: "Cells", value: "cells" },
];

function GridProperty(props: GridPropertyProps) {
  const dispatch = useDispatch();
  const gridData = useSelector((state: RootState) => state.controls.grid);

  const gridValue = props.axis === "x" ? gridData.width : gridData.height;
  const units = props.axis === "x" ? gridData.widthUnits : gridData.heightUnits;

  const numberRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  function handleChange() {
    if (numberRef.current !== null && selectRef.current !== null) {
      let numberValue = parseInt(numberRef.current.value);
      if (Number.isNaN(numberValue)) {
        numberValue = 1;
      }
      const newGridData = {
        axis: props.axis,
        value: clamp(numberValue, 1, 9999),
        units: selectRef.current.value as gridUnits,
      };
      dispatch(setGridProperty(newGridData));
    }
  }

  return (
    <div className="grid-property">
      <label>{props.label}</label>
      <div className="input-inline">
        <input
          type="number"
          min="1"
          max="9999"
          value={gridValue}
          ref={numberRef}
          onChange={handleChange}
        />
        <select
          className="browser-default"
          value={units}
          ref={selectRef}
          onChange={handleChange}
        >
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

export default GridWindow;
