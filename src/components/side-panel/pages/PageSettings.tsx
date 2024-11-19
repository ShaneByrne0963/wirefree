import { useDispatch } from "react-redux";
import { setWindow } from "../../../state/window/windowSlice";

function PageSettings() {
  const dispatch = useDispatch();

  return (
    <a
      role="button"
      className="max-height-square"
      onClick={() => dispatch(setWindow("pageSettings"))}
    >
      <i className="material-icons">menu</i>
    </a>
  );
}

export default PageSettings;
