import { useState } from "react";

interface PageListItemProps {
  name: string;
  canDelete: boolean;
}

function PageListItem(props: PageListItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState(props.name);

  return (
    <div className="page-item">
      {editMode ? (
        <>
          <input
            type="text"
            value={val}
            className="edit-page-item browser-default"
            autoFocus
            onChange={(event) => setVal(event.target.value)}
          />
          <button className="plain max-height-square material-icons">
            check
          </button>
          <button
            className="plain max-height-square material-icons"
            onClick={() => {
              setEditMode(false);
              setVal(props.name);
            }}
          >
            close
          </button>
        </>
      ) : (
        <>
          <div className="page-name">{props.name}</div>
          <button
            className="plain max-height-square material-icons"
            onClick={() => setEditMode(true)}
          >
            create
          </button>
          {props.canDelete && (
            <button className="plain max-height-square material-icons">
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PageListItem;
