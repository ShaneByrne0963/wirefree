type CanvasProps = {
  ratio: number;
};

function Canvas(props: CanvasProps) {
  const canvasCss = {
    "--aspect-ratio": props.ratio,
  } as React.CSSProperties;
  return <div id="canvas" style={canvasCss} className="z-depth-2"></div>;
}

export default Canvas;
