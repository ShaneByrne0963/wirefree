import { useDispatch } from "react-redux";
import {
  ConfirmActionProps,
  setWindowActive,
  WindowMessageProps,
} from "../../state/slices/windowSlice";
import { WindowActionButtons } from "./Window";
import { deletePage, resetPageSlice } from "../../state/slices/pageSlice";
import { resetControlSlice } from "../../state/slices/controlSlice";
import { resetScreenSlice } from "../../state/slices/screenSizeSlice";

// All the functions that need confirmation should be stored here
export const confirmActions = {
  newProject: [resetPageSlice, resetScreenSlice, resetControlSlice],
  deletePage: deletePage,
};

function WindowMessage(props: WindowMessageProps | ConfirmActionProps) {
  const dispatch = useDispatch();
  const body =
    typeof props.bodyText === "string" ? [props.bodyText] : props.bodyText;

  function handleConfirm() {
    if ("action" in props) {
      const action = confirmActions[props.action];
      if (typeof action === "function") {
        dispatch(action(props.parameter || null));
      } else {
        action.map((func) => dispatch(func(props.parameter || null)));
      }
      dispatch(setWindowActive([props.label, false]));
    }
  }
  return (
    <>
      <div className="confirm-body">
        {body.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      {"action" in props ? (
        <WindowActionButtons
          text={props.buttonText}
          canSubmit={true}
          action={handleConfirm}
          windowLabel={props.label}
        ></WindowActionButtons>
      ) : (
        <WindowActionButtons
          windowLabel={props.label}
          close="ok"
        ></WindowActionButtons>
      )}
    </>
  );
}

export default WindowMessage;
