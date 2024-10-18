import Canvas from "./Canvas";

function CanvasContainer() {
    return (
        <div id="canvas-container">
            <Canvas width={768} height={1024}></Canvas>
        </div>
    );
}

export default CanvasContainer;