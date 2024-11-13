import { useSelector } from "react-redux";
import PageSettings from "./PageSettings";
import { RootState } from "../../state/store";

function PageName() {
  const pageData = useSelector((state: RootState) => state.pages);
  return (
    <div id="page-select">
      <div id="selected-page">
        <div className="side-panel-label">
          {pageData.pages[pageData.selectedPage].name}
        </div>
        <i className="small material-icons">arrow_drop_down</i>
      </div>
      <PageSettings></PageSettings>
    </div>
  );
}

export default PageName;
