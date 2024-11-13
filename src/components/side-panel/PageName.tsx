import PageSettings from "./PageSettings";

function PageName() {
  return (
    <div id="page-select">
      <div id="selected-page">
        <div className="side-panel-label">index</div>
        <i className="small material-icons">arrow_drop_down</i>
      </div>
      <PageSettings></PageSettings>
    </div>
  );
}

export default PageName;
