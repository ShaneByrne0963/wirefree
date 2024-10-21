import { useDispatch } from "react-redux";
import { setWindow } from "../../state/window/WindowSlice";

function AddScreenSize() {
  const dispatch = useDispatch();
  return (
    <button
      id="add-screen-size"
      className="plain"
      onClick={() => dispatch(setWindow())}
    >
      <i className="small material-icons">add</i>
    </button>
  );
}

export default AddScreenSize;
