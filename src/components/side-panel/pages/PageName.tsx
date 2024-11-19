import { useSelector } from "react-redux";
import PageSettings from "./PageSettings";
import { RootState } from "../../../state/store";
import PageDropdown from "./PageDropdown";
import useOutsideClick from "../../hooks/useOutsideClick";

function PageName() {
  const pageData = useSelector((state: RootState) => state.pages);
  const { ref, isActive, handleClickInside } = useOutsideClick();
  return (
    <div id="page-select" className="clickable">
      <div id="selected-page" ref={ref} onClick={handleClickInside}>
        <div className="side-panel-label">
          {pageData.pages[pageData.selectedPage].name}
        </div>
        <i className="small material-icons">arrow_drop_down</i>
        {isActive && <PageDropdown></PageDropdown>}
      </div>
      <PageSettings></PageSettings>
    </div>
  );
}

export default PageName;
