import VectorGraphic, { iconData } from "../VectorGraphic";

function GridControls() {
    let gridPath = iconData.Grid;
    return <div id="grid-controls" className="z-depth-2 red lighten-2">
        <VectorGraphic path={gridPath} color="rgb(255, 255, 255)"></VectorGraphic>
    </div>;
}

export default GridControls;