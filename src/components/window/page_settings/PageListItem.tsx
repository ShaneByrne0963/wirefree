import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { renamePage, setPage } from "../../../state/page/pageSlice";

interface PageListItemProps {
  name: string;
  index: number;
  canDelete: boolean;
  isEdit: boolean;
  setEdit: (index: number) => void;
}

function PageListItem(props: PageListItemProps) {
  const [val, setVal] = useState(props.name);
  const pages = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch();
  let feedback = "";

  if (props.isEdit && val.length > 0 && val !== props.name) {
    for (let page of pages.pages) {
      if (page.name === val) {
        feedback = "That page name already exists";
        break;
      }
    }
  }
  const isValid = val.length > 0 && feedback.length === 0;

  return (
    <div
      className={
        pages.selectedPage === props.index ? "page-item selected" : "page-item"
      }
    >
      {props.isEdit ? (
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
              props.setEdit(-1);
            }}
          >
            check
          </button>
          <button
            className="plain max-height-square material-icons clickable"
            onClick={() => {
              props.setEdit(-1);
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
          <div
            className="page-name"
            onClick={() => dispatch(setPage(props.index))}
          >
            {props.name}
          </div>
          <button
            className="plain max-height-square material-icons clickable"
            onClick={() => props.setEdit(props.index)}
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
