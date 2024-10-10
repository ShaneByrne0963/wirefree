import SidePanelLabel from "./SidePanelLabel";

type SidePanelWindowProps = {
  windowType: string;
  label?: string;
  color: string;
};

type WindowComponentProps = {
  size: string;
};

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
      {props.label && <SidePanelLabel color={props.color} text={props.label}></SidePanelLabel>}
      <WindowComponent size={windowSize}></WindowComponent>
    </>
  );
}

function WindowComponent(props: WindowComponentProps) {
  return <div id="select-screen-window" className={"side-panel-window " + props.size}></div>;
}

export default SidePanelWindow;
