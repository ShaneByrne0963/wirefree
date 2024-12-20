import ShapeGroups from "./ShapeGroups";
import ShapeList from "./ShapeList";

interface ShapeSelectorProps {
  tab: number;
  setTab: () => void;
}

function ShapeSelector(props: ShapeSelectorProps) {
  return (
    <>
      <ShapeList tab={props.tab}></ShapeList>
      <ShapeGroups
        selectedGroup={props.tab}
        handleChangeGroup={props.setTab}
      ></ShapeGroups>
    </>
  );
}

export default ShapeSelector;
