import { useDispatch } from "react-redux";
import {
  ConfirmActionProps,
  setWindowActive,
} from "../../state/window/windowSlice";
import { WindowActionButtons } from "./Window";

function ConfirmAction(props: ConfirmActionProps) {
  const dispatch = useDispatch();

  function handleConfirm() {
    props.action();
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
