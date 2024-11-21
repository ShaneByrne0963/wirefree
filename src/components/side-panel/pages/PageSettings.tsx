import { useDispatch } from "react-redux";
import { addWindow } from "../../../state/window/windowSlice";

function PageSettings() {
  const dispatch = useDispatch();

  return (
    <a
      role="button"
      className="max-height-square"
      onClick={() => dispatch(addWindow("pageSettings"))}
    >
      <i className="material-icons">menu</i>
    </a>
  );
}

export default PageSettings;
