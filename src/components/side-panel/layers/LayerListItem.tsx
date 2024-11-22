interface LayerListItemProps {
  name: string;
}

function LayerListItem(props: LayerListItemProps) {
  return <div className="layer-list-item">{props.name}</div>;
}

export default LayerListItem;
