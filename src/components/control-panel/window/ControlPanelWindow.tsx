interface ControlPanelWindowProps {
  content: React.ComponentType;
  props: { [key: string]: any };
}

function ControlPanelWindow(props: ControlPanelWindowProps) {
  return (
    <div className="control-panel-window">
      <props.content {...props.props} />
    </div>
  );
}

export default ControlPanelWindow;
