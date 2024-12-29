type SidePanelLabelProps = {
  text: string;
};

function SidePanelLabel(props: SidePanelLabelProps) {
  return (
    <div className="side-panel-label grey-text text-darken-4">{props.text}</div>
  );
}

export default SidePanelLabel;
