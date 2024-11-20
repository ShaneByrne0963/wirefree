import { useSelector } from "react-redux";
import PageSettings from "./PageSettings";
import { RootState } from "../../../state/store";
import PageDropdown from "./PageDropdown";
import useOutsideClick from "../../hooks/useOutsideClick";

function PageName() {
  const pageData = useSelector((state: RootState) => state.pages);

  // Allows the sropdown to close if the user clicks away from it
  const { ref, isActive, handleClickInside } = useOutsideClick();

  // Remove the arrow and disable the dropdown if only 1 page exists
  let iconClass = "small material-icons";
  if (pageData.pages.length <= 1) {
    iconClass += " invisible";
  }
  return (
    <div id="page-select">
      <div id="selected-page" ref={ref} onClick={handleClickInside}>
        <div className="side-panel-label">
          {pageData.pages[pageData.selectedPage].name}
        </div>
        <i className={iconClass}>arrow_drop_down</i>
        {isActive && <PageDropdown></PageDropdown>}
      </div>
      <PageSettings></PageSettings>
    </div>
  );
}

export default PageName;
