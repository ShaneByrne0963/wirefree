type ScreenSizeButtonProps = {
  name: string;
  width: number;
  height: number;
};

function ScreenSizeButton(props: ScreenSizeButtonProps) {
  // Find the dimensions to display on the blueprint
  const screenCss = {
    aspectRatio: `${props.width} / ${props.height}`,
  };
  // Get if the screen is long or wide
  const screenType = props.height > props.width ? "long" : "wide";
  return (
    <div
      id={"select-screen-" + props.name}
      className="screen-size-select-button"
    >
      <div className="screen-blueprint-container">
        <div
          className={"screen-blueprint " + screenType}
          style={screenCss}
        ></div>
      </div>
      <div className="screen-button-text">
        <div>
          <strong>{props.name}</strong>
        </div>
        <small>
          {props.width} &times; {props.height}
        </small>
      </div>
    </div>
  );
}

export default ScreenSizeButton;
