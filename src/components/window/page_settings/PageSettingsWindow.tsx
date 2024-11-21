import { useDispatch, useSelector } from "react-redux";
import AddItemInput from "../../inputs/AddItemInput";
import { WindowActionButtons } from "../Window";
import PageList from "./PageList";
import { createPage } from "../../../state/page/pageSlice";
import { setWindowActive } from "../../../state/window/windowSlice";
import { RootState } from "../../../state/store";

const windowLabel = "Page Settings";
function PageSettingsWindow() {
  const dispatch = useDispatch();

  function addPage(name: string) {
    dispatch(createPage(name));
    dispatch(setWindowActive([windowLabel, false]));
  }

  const pages = useSelector((state: RootState) => state.pages.pages);
  const pageNames = pages.map((item) => item.name);

  return (
    <>
      <PageList></PageList>
      <div className="heading">New Page</div>
      <AddItemInput
        inputId="add-page"
        placeholder="Page Name"
        maxLength={20}
        existingVals={pageNames}
        onSuccess={addPage}
      ></AddItemInput>
      <WindowActionButtons
        close
        windowLabel={windowLabel}
      ></WindowActionButtons>
    </>
  );
}

export default PageSettingsWindow;
