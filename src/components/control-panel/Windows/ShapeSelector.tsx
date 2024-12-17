import ShapeGroups from "./ShapeGroups";
import ShapeList from "./ShapeList";

function ShapeSelector() {
  return (
    <>
      <ShapeList tab={0}></ShapeList>
      <ShapeGroups
        selectedGroup={0}
        handleChangeGroup={() => null}
      ></ShapeGroups>
    </>
  );
}

export default ShapeSelector;
