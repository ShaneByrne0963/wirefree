import AddItemInput from "../../inputs/AddItemInput";
import { WindowActionButtons } from "../Window";
import PageList from "./PageList";

function addPage(name: string) {
  console.log(name);
}

function PageSettingsWindow() {
  return (
    <>
      <PageList></PageList>
      <div className="heading">New Page</div>
      <AddItemInput
        inputId="add-page"
        placeholder="Page Name"
        onSuccess={addPage}
      ></AddItemInput>
      <WindowActionButtons close></WindowActionButtons>
    </>
  );
}

export default PageSettingsWindow;
