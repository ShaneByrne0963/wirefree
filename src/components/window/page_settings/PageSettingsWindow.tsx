import { useDispatch } from "react-redux";
import AddItemInput from "../../inputs/AddItemInput";
import { WindowActionButtons } from "../Window";
import PageList from "./PageList";
import { createPage } from "../../../state/page/pageSlice";
import { closeWindow } from "../../../state/window/windowSlice";

function PageSettingsWindow() {
  const dispatch = useDispatch();

  function addPage(name: string) {
    dispatch(createPage({ name: name }));
    dispatch(closeWindow());
  }

  return (
    <>
      <PageList></PageList>
      <div className="heading">New Page</div>
      <AddItemInput
        inputId="add-page"
        placeholder="Page Name"
        maxLength={20}
        onSuccess={addPage}
      ></AddItemInput>
      <WindowActionButtons close></WindowActionButtons>
    </>
  );
}

export default PageSettingsWindow;
