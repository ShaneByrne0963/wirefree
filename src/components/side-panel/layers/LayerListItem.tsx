import { useDispatch } from "react-redux";
import {
  selectLayer,
  toggleLayerVisibility,
} from "../../../state/page/pageSlice";

interface LayerListItemProps {
  name: string;
  index: number;
  selected: boolean;
  visible: boolean;
}

function LayerListItem(props: LayerListItemProps) {
  const dispatch = useDispatch();

  let className = "layer-list-item";
  if (props.selected) {
    className += " selected";
  }
  className += props.visible ? " layer-visible" : " layer-invisible";

  return (
    <div className={className}>
      <div
        className={"clickable"}
        onClick={() => dispatch(selectLayer(props.index))}
      >
        {props.name}
      </div>
      <button
        className={"plain clickable-always max-height-square material-icons"}
        onClick={() => dispatch(toggleLayerVisibility(props.index))}
      >
        {props.visible ? "visibility" : "visibility_off"}
      </button>
    </div>
  );
}

export default LayerListItem;
