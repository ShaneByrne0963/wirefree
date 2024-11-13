interface PageListItemProps {
  name: string;
  canDelete: boolean;
}

function PageListItem(props: PageListItemProps) {
  return (
    <div className="page-item">
      <div className="page-name">{props.name}</div>
      <button className="plain max-height-square material-icons">create</button>
      {props.canDelete && (
        <button className="plain max-height-square material-icons">
          delete
        </button>
      )}
    </div>
  );
}

export default PageListItem;
