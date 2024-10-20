type CanvasProps = {
  width: number;
  height: number;
};

function Canvas(props: CanvasProps) {
  const canvasCss = {
    "--aspect-ratio": props.width / props.height,
  } as React.CSSProperties;
  return <div id="canvas" style={canvasCss}></div>;
}

export default Canvas;
