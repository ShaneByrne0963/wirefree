import SidePanelLabel from "./SidePanelLabel";

type ShapePaletteProps = {
  color: string;
};

function ShapePalette(props: ShapePaletteProps) {
  return (
    <>
      <SidePanelLabel color={props.color} text="Shapes"></SidePanelLabel>
      <div id="shape-palette">
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
        <ShapeButton></ShapeButton>
      </div>
    </>
  );
}

function ShapeButton() {
  return <div className="shape-button"></div>;
}

export default ShapePalette;
