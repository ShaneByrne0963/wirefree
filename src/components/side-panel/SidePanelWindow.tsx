type SidePanelWindowProps = {
  windowType: string;
  label?: string;
  color: string;
}

type WindowComponentProps = {
  size: string;
}

function SidePanelWindow(props: SidePanelWindowProps) {
  let windowSize = "md";
  switch (props.windowType) {
    case "layers":
      windowSize = "lg";
      break;
    default:
      break;
  }
  return (
    <>
      {props.label && <div className={"side-panel-label " + props.color + "-text text-darken-4"}>{props.label}</div>}
      <WindowComponent size={windowSize}></WindowComponent>
    </>
  );
}

function WindowComponent(props: WindowComponentProps) {
  return <div id="select-screen-window" className={"side-panel-window " + props.size}></div>;
}

export default SidePanelWindow;
