interface WindowContainerProps {
  status: string;
}

function WindowContainer(props: WindowContainerProps) {
  return (
    <div id="window-container" className={props.status ? "active" : ""}>
      <Window></Window>
    </div>
  );
}

function Window() {
  return (
    <div id="window">
      <div id="window-top"></div>
    </div>
  );
}

export default WindowContainer;
