import { useDispatch } from "react-redux";
import { setWindow } from "../../state/window/windowSlice";

function AddScreenSize() {
  const dispatch = useDispatch();
  return (
    <button
      id="add-screen-size"
      className="plain"
      onClick={() => dispatch(setWindow("addScreenSize"))}
    >
      <i className="small material-icons">add</i>
    </button>
  );
}

export default AddScreenSize;
