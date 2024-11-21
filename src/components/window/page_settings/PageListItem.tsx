import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { renamePage, setPage } from "../../../state/page/pageSlice";
import {
  confirmAction,
  ConfirmActionProps,
} from "../../../state/window/windowSlice";

interface PageListItemProps {
  name: string;
  index: number;
  canDelete: boolean;
  isEdit: boolean;
  setEdit: (index: number) => void;
}

const deletePageBody = `Are you sure you want to delete this page?`;

function PageListItem(props: PageListItemProps) {
  const [val, setVal] = useState(props.name);
  const pages = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch();
  let feedback = "";

  const deleteWindowProps: ConfirmActionProps = {
    label: "Confirm Page Delete",
    bodyText: deletePageBody,
    buttonText: "Delete",
    action: "deletePage",
    parameter: props.index,
  };

  if (props.isEdit && val.length > 0 && val !== props.name) {
    for (let page of pages.pages) {
      if (page.name === val) {
        feedback = "That page name already exists";
        break;
      }
    }
  }
  const isValid = val.length > 0 && feedback.length === 0;

  let pageClassName = "page-item";
  if (pages.selectedPage === props.index) {
    pageClassName += " selected";
  }
  if (props.isEdit) {
    pageClassName += " edit-mode";
  }

  return (
    <div className={pageClassName}>
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
          <button
            className="plain max-height-square material-icons clickable"
            onClick={() => props.setEdit(props.index)}
          >
            content_copy
          </button>
          {props.canDelete && (
            <button
              className="plain max-height-square material-icons clickable"
              onClick={() => dispatch(confirmAction(deleteWindowProps))}
            >
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default PageListItem;
