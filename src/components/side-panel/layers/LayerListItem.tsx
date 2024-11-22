import { useDispatch } from "react-redux";
import { selectLayer } from "../../../state/page/pageSlice";

interface LayerListItemProps {
  name: string;
  index: number;
  selected: boolean;
}

function LayerListItem(props: LayerListItemProps) {
  const dispatch = useDispatch();
  return (
    <div className={"layer-list-item" + (props.selected ? " selected" : "")}>
      <div
        className="clickable"
        onClick={() => dispatch(selectLayer(props.index))}
      >
        {props.name}
      </div>
    </div>
  );
}

export default LayerListItem;
