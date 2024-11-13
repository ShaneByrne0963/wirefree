interface PageListItemProps {
  name: string;
}

function PageListItem(props: PageListItemProps) {
  return <div>{props.name}</div>;
}

export default PageListItem;
