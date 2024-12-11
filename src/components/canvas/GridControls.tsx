import { useDispatch } from "react-redux";
import VectorGraphic, { iconData } from "../VectorGraphic";
import { addWindow } from "../../state/slices/windowSlice";

function GridControls() {
  const gridPath = iconData.Grid;
  const dispatch = useDispatch();

  return (
    <div
      id="grid-controls"
      className="z-depth-2 red lighten-2"
      onClick={() => dispatch(addWindow("gridSettings"))}
    >
      <VectorGraphic path={gridPath} color="rgb(255, 255, 255)"></VectorGraphic>
    </div>
  );
}

export default GridControls;
