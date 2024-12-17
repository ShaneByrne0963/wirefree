interface ControlPanelWindowProps {
  content: React.ComponentType;
}

function ControlPanelWindow(props: ControlPanelWindowProps) {
  return (
    <div className="control-panel-window">
      <props.content />
    </div>
  );
}

export default ControlPanelWindow;
