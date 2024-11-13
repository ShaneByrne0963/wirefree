interface PageListItemProps {
  name: string;
}

function PageListItem(props: PageListItemProps) {
  return (
    <div className="page-item">
      <div className="page-name">{props.name}</div>
      <button className="plain max-height-square material-icons">create</button>
      <button className="plain max-height-square material-icons">delete</button>
    </div>
  );
}

export default PageListItem;
