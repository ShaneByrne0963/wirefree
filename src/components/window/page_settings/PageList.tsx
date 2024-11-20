import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import PageListItem from "./PageListItem";

function PageList() {
  const pages = useSelector((state: RootState) => state.pages.pages);
  return (
    <div id="page-list">
      <div className="heading">Pages</div>
      <div id="page-container">
        {pages.map((item, index) => (
          <PageListItem
            name={item.name}
            key={item.name}
            index={index}
            canDelete={pages.length > 1}
          ></PageListItem>
        ))}
      </div>
    </div>
  );
}

export default PageList;
