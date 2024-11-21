import { useDispatch } from "react-redux";
import {
  ConfirmActionProps,
  setWindowActive,
} from "../../state/window/windowSlice";
import { WindowActionButtons } from "./Window";
import { deletePage } from "../../state/page/pageSlice";

// All the functions that need confirmation should be stored here
export const confirmActions = {
  deletePage: deletePage,
};

function ConfirmAction(props: ConfirmActionProps) {
  const dispatch = useDispatch();

  function handleConfirm() {
    dispatch(confirmActions[props.action](props.parameter || null));
    dispatch(setWindowActive([props.label, false]));
  }
  return (
    <>
      <div className="confirm-body">{props.bodyText}</div>
      <WindowActionButtons
        text={props.buttonText}
        canSubmit={true}
        action={handleConfirm}
        windowLabel={props.label}
      ></WindowActionButtons>
    </>
  );
}

export default ConfirmAction;
