import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setPage } from "../../../state/slices/pageSlice";
import deselectShapes from "../../../hooks/deselectShapes";

interface PageDropdownItemProps {
  name: string;
  index: number;
}

function PageDropdown() {
  const pageData = useSelector((state: RootState) => state.pages);
  return (
    <div id="page-list-dropdown">
      {pageData.pages.map((page, index) => (
        <PageDropdownItem
          key={index}
          name={page.name}
          index={index}
        ></PageDropdownItem>
      ))}
    </div>
  );
}

function PageDropdownItem(props: PageDropdownItemProps) {
  const dispatch = useDispatch();
  const handleDeselect = deselectShapes();
  return (
    <div
      className="page-dropdown-item trigger-clickaway"
      onClick={(event: React.MouseEvent) => {
        handleDeselect(event);
        dispatch(setPage(props.index));
      }}
    >
      {props.name}
    </div>
  );
}

export default PageDropdown;
