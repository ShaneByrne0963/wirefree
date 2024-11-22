import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import {
  duplicatePage,
  renamePage,
  setPage,
} from "../../../state/page/pageSlice";
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

  if (props.isEdit && val.trim().length > 0 && val !== props.name) {
    for (let page of pages.pages) {
      if (page.name === val.trim()) {
        feedback = "That page name already exists";
        break;
      }
    }
  }
  const isValid = val.trim().length > 0 && feedback.length === 0;

  let pageClassName = "page-item";
  if (pages.selectedPage === props.index) {
    pageClassName += " selected";
  }
  if (props.isEdit) {
    pageClassName += " edit-mode";
  }

  // Duplication of a page
  function handleDuplicatePage() {
    let pageName = props.name;

    // Remove an identifier if one exists
    if (pageName.includes(" (") && pageName.includes(")")) {
      let charString = "";
      let isInBrackets = false;
      for (let i = 0; i < pageName.length; i++) {
        let char = pageName[i];
        // Is redundant if anything exists past the closing bracket
        if (!isInBrackets) {
          charString = "";
          if (char === "(" && i > 0 && pageName[i - 1] === " ") {
            isInBrackets = true;
          }
        } else {
          if (char === ")") {
            isInBrackets = false;
          } else {
            charString += char;
          }
        }
      }
      if (charString) {
        // Ensures whatever is in the brackets is a number, or doesn't delete it
        pageName = pageName.replace(` (${parseInt(charString)})`, "");
      }
    }

    // Add a number to the end to differentiate from the original
    let identifier = 1;
    let uniquePage = false;
    while (!uniquePage) {
      uniquePage = true;
      let newPageName = `${pageName} (${identifier})`;
      for (let page of pages.pages) {
        if (page.name === newPageName) {
          uniquePage = false;
          identifier++;
          break;
        }
      }
    }
    pageName += ` (${identifier})`;
    dispatch(duplicatePage([props.index, pageName]));
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
              dispatch(renamePage([props.index, val.trim()]));
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
            onClick={handleDuplicatePage}
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
