import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import PageListItem from "./PageListItem";
import { useState } from "react";

function PageList() {
  const pages = useSelector((state: RootState) => state.pages.pages);
  const [editPage, setEditPage] = useState(-1);
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
            isEdit={editPage === index}
            setEdit={setEditPage}
          ></PageListItem>
        ))}
      </div>
    </div>
  );
}

export default PageList;
