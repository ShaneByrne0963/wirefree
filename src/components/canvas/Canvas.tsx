type CanvasProps = {
    width: number;
    height: number;
};

function Canvas(props: CanvasProps) {
    const canvasCss = {
        width: `${props.width}px`,
        height: `${props.height}px`,
    }
    return (
        <div id="canvas" style={canvasCss}></div>
    );
}

export default Canvas;