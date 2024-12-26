import { useDispatch } from "react-redux";
import {
  selectLayer,
  toggleLayerVisibility,
} from "../../../state/slices/pageSlice";
import deselectShapes from "../../../hooks/deselectShapes";

interface LayerListItemProps {
  name: string;
  index: number;
  selected: boolean;
  visible: boolean;
  isBase: boolean;
}

function LayerListItem(props: LayerListItemProps) {
  const dispatch = useDispatch();
  const handleDeselect = deselectShapes();

  function handleClick(event: React.MouseEvent) {
    dispatch(selectLayer(props.index));
    handleDeselect(event);
  }

  let className = "layer-list-item";
  if (props.selected) {
    className += " selected";
  }
  className += props.visible ? " layer-visible" : " layer-invisible";

  return (
    <div className={className}>
      <div
        className={"clickable" + (props.isBase ? " base-layer" : "")}
        onClick={handleClick}
      >
        {props.name}
      </div>
      <button
        className={"plain clickable max-height-square material-icons"}
        onClick={() => dispatch(toggleLayerVisibility(props.index))}
      >
        {props.visible ? "visibility" : "visibility_off"}
      </button>
    </div>
  );
}

export default LayerListItem;
