import { WindowActionButtons } from "../Window";
import PageList from "./PageList";

function PageSettingsWindow() {
  return (
    <>
      <PageList></PageList>
      <WindowActionButtons close></WindowActionButtons>
    </>
  );
}

export default PageSettingsWindow;
