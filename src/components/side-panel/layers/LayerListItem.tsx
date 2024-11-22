interface LayerListItemProps {
  name: string;
}

function LayerListItem(props: LayerListItemProps) {
  return <div>{props.name}</div>;
}

export default LayerListItem;
