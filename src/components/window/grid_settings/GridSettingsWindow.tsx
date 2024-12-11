import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { ChangeEvent } from "react";
import { setGridStatus } from "../../../state/slices/shapeSlice";

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
    </>
  );
}

export default GridSettingsWindow;
