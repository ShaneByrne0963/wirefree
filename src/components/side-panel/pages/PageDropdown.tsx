import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

interface PageDropdownItemProps {
  name: string;
}

function PageDropdown() {
  const pageData = useSelector((state: RootState) => state.pages);
  return (
    <div id="page-list-dropdown">
      {pageData.pages.map((page, index) => (
        <PageDropdownItem key={index} name={page.name}></PageDropdownItem>
      ))}
    </div>
  );
}

function PageDropdownItem(props: PageDropdownItemProps) {
  return <div className="page-dropdown-item">{props.name}</div>;
}

export default PageDropdown;
