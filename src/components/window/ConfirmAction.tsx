import { useDispatch } from "react-redux";
import {
  ConfirmActionProps,
  setWindowActive,
} from "../../state/slices/windowSlice";
import { WindowActionButtons } from "./Window";
import { deletePage, resetPageSlice } from "../../state/slices/pageSlice";
import { resetShapeSlice } from "../../state/slices/shapeSlice";
import { resetScreenSlice } from "../../state/slices/screenSizeSlice";

// All the functions that need confirmation should be stored here
export const confirmActions = {
  newProject: [resetPageSlice, resetScreenSlice, resetShapeSlice],
  deletePage: deletePage,
};

function ConfirmAction(props: ConfirmActionProps) {
  const dispatch = useDispatch();
  const body =
    typeof props.bodyText === "string" ? [props.bodyText] : props.bodyText;

  function handleConfirm() {
    const action = confirmActions[props.action];
    if (typeof action === "function") {
      dispatch(action(props.parameter || null));
    } else {
      action.map((func) => dispatch(func(props.parameter || null)));
    }
    dispatch(setWindowActive([props.label, false]));
  }
  return (
    <>
      <div className="confirm-body">
        {body.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
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
