import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { renamePage } from "../../../state/page/pageSlice";

interface PageListItemProps {
  name: string;
  index: number;
  canDelete: boolean;
}

function PageListItem(props: PageListItemProps) {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState(props.name);
  const pages = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch();
  let feedback = "";

  if (editMode && val.length > 0 && val !== props.name) {
    for (let page of pages.pages) {
      if (page.name === val) {
        feedback = "That page name already exists";
        break;
      }
    }
  }
  const isValid = val.length > 0 && feedback.length === 0;

  return (
    <div className="page-item">
      {editMode ? (
        <>
          <input
            type="text"
            value={val}
            className="edit-page-item browser-default"
            maxLength={20}
            autoFocus
            onChange={(event) => setVal(event.target.value)}
          />
          <button
            className="plain max-height-square material-icons clickable"
            disabled={!isValid}
            onClick={() => {
              dispatch(renamePage([props.index, val]));
              setEditMode(false);
            }}
          >
            check
          </button>
          <button
            className="plain max-height-square material-icons clickable"
            onClick={() => {
              setEditMode(false);
              setVal(props.name);
            }}
          >
            close
          </button>
          {feedback.length > 0 && (
            <div className="window-feedback">{feedback}</div>
          )}
        </>
      ) : (
        <>
          <div className="page-name">{props.name}</div>
          <button
            className="plain max-height-square material-icons clickable"
            onClick={() => setEditMode(true)}
          >
            create
          </button>
          {props.canDelete && (
            <button className="plain max-height-square material-icons clickable">
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PageListItem;
