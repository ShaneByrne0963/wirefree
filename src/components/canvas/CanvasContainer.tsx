import Canvas from "./Canvas";

interface Props {
  canvasRatio: number;
}

function CanvasContainer(props: Props) {
  return (
    <div id="canvas-container">
      <Canvas ratio={props.canvasRatio}></Canvas>
    </div>
  );
}

export default CanvasContainer;
