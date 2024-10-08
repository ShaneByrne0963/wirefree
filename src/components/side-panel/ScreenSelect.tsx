function ScreenSelect() {
  return (
    <>
      <div className="side-panel-label">Screen</div>
      <ScreenSelectWindow></ScreenSelectWindow>
    </>
  );
}

function ScreenSelectWindow() {
  return <div id="select-screen-window" className="side-panel-window"></div>;
}

export default ScreenSelect;
