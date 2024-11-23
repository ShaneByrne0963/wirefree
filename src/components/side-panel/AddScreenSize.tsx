import { useDispatch } from "react-redux";
import { addWindow } from "../../state/slices/windowSlice";

function AddScreenSize() {
  const dispatch = useDispatch();
  return (
    <button
      id="add-screen-size"
      className="plain"
      onClick={() => dispatch(addWindow("addScreenSize"))}
    >
      <i className="small material-icons">add</i>
    </button>
  );
}

export default AddScreenSize;
