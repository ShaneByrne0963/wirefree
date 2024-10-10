type SidePanelWindowProps = {
  windowType: string;
}

type WindowComponentProps = {
  size: string;
}

function SidePanelWindow(props: SidePanelWindowProps) {
  let windowSize = "md";
  switch (props.windowType) {

  }
  return (
    <>
      <div className="side-panel-label">Screen</div>
      <WindowComponent size={windowSize}></WindowComponent>
    </>
  );
}

function WindowComponent(props: WindowComponentProps) {
  return <div id="select-screen-window" className={"side-panel-window " + props.size}></div>;
}

export default SidePanelWindow;
