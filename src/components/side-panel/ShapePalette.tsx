import SidePanelLabel from "./SidePanelLabel";

type ShapePaletteProps = {
  color: string;
};

// How many shapes exist in a single row
const paletteSpan = 12;

function ShapePalette(props: ShapePaletteProps) {
    let paletteCss = {
      gridTemplateColumns: "repeat(" + paletteSpan + ", 1fr)"
    };
    return (
      <>
        <SidePanelLabel color={props.color} text="Shapes"></SidePanelLabel>
        <div id="shape-palette" style={paletteCss}>
          <ShapeButton></ShapeButton>
        </div>
      </>
    );
}

function ShapeButton() {
    return (
        <div className="shape-button"></div>
    )
}

export default ShapePalette;