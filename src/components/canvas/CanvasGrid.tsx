import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

function CanvasGrid() {
  const gridData = useSelector((state: RootState) => state.controls.grid);
  let screenSizeData = useSelector((state: RootState) => state.screenSize);
  const activeScreen =
    screenSizeData.activeScreens[screenSizeData.selectedScreen];
  let columnCells = 0;
  let columnValue = "";
  let rowCells = 0;
  let rowValue = "";

  switch (gridData.widthUnits) {
    case "px":
      columnCells = Math.floor(activeScreen.width / gridData.width);
      columnValue = gridData.width + "px";
      break;
    case "%":
      columnCells = Math.floor(100 / gridData.width);
      columnValue = gridData.width + "%";
      break;
    case "cells":
      columnCells = Math.round(gridData.width);
      columnValue = "1fr";
      break;
  }

  switch (gridData.heightUnits) {
    case "px":
      rowCells = Math.floor(activeScreen.height / gridData.height);
      rowValue = gridData.height + "px";
      break;
    case "%":
      rowCells = Math.floor(100 / gridData.height);
      rowValue = gridData.height + "%";
      break;
    case "cells":
      rowCells = Math.round(gridData.height);
      rowValue = "1fr";
      break;
  }

  const columnStyles = {
    gridTemplateColumns: `repeat(${columnCells}, ${columnValue})`,
  };
  const rowStyles = {
    gridTemplateRows: `repeat(${rowCells}, ${rowValue})`,
  };

  return (
    <div id="canvas-grid">
      {columnCells < 1000 && (
        <div id="grid-columns" style={columnStyles}>
          {[...Array(columnCells)].map((_, index) => (
            <div key={index}></div>
          ))}
        </div>
      )}
      {rowCells < 1000 && (
        <div id="grid-rows" style={rowStyles}>
          {[...Array(rowCells)].map((_, index) => (
            <div key={index}></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CanvasGrid;
