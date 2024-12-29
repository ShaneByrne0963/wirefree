import { RootState } from "../../state/store";
import SidePanelLabel from "./SidePanelLabel";
import ScreenSizeButton from "./ScreenSizeButton";
import AddScreenSize from "./AddScreenSize";
import { useDispatch, useSelector } from "react-redux";
import { selectScreenSize } from "../../state/slices/screenSizeSlice";
import LayerList from "./layers/LayerList";
import { updatePageSelectedScreen } from "../../state/slices/pageSlice";
import ShapeList from "../control-panel/window/shapes/ShapeList";
import deselectShapes from "../../hooks/deselectShapes";

///////// Configuration

// The size of the section depending on the type
const sectionSizes = {
  shapes: "lg",
  layers: "lg",
  screen: "sm",
};

///////// Property Types

type SidePanelSectionProps = {
  sectionType: string;
  label?: string;
  labelButton?: string;
  labelButtonAction?: (...args: any[]) => any;
  canOverflow?: boolean;
  selectedIndex?: number;
};

type SectionComponentProps = {
  sectionType: string;
  canOverflow: boolean;
  selectedIndex?: number;
};

///////// Components

function SidePanelSection(props: SidePanelSectionProps) {
  let labelHtml = null;
  if (props.label) {
    labelHtml = <SidePanelLabel text={props.label}></SidePanelLabel>;
    if (props.labelButton) {
      labelHtml = (
        <div className="label-with-button">
          {labelHtml}
          <a
            role="button"
            className="plain max-height-square material-icons"
            onClick={props.labelButtonAction}
          >
            {props.labelButton}
          </a>
        </div>
      );
    }
  }
  let panelSectionHtml = (
    <>
      {labelHtml}
      <SectionComponent
        sectionType={props.sectionType}
        canOverflow={props.canOverflow === true}
        selectedIndex={props.selectedIndex}
      ></SectionComponent>
    </>
  );

  // If the section is accompanied by a label, then wrap the HTML in a div
  if (props.label) {
    return (
      <div id={"section-" + props.sectionType + "-container"}>
        {panelSectionHtml}
      </div>
    );
  }
  return panelSectionHtml;
}

function SectionComponent(props: SectionComponentProps) {
  // Get the size of the section based on the type
  const sectionSize =
    sectionSizes[props.sectionType as keyof typeof sectionSizes];
  const activeScreenSizes = useSelector(
    (state: RootState) => state.screenSize.activeScreens
  );
  const selectedIndex = useSelector(
    (state: RootState) => state.screenSize.selectedScreen
  );
  const handleDeselect = deselectShapes();
  const dispatch = useDispatch();

  return (
    <div
      id={"section-" + props.sectionType}
      className={"side-panel-section " + sectionSize}
    >
      {props.sectionType === "shapes" && (
        <ShapeList tab={props.selectedIndex}></ShapeList>
      )}
      {props.sectionType === "layers" && <LayerList></LayerList>}
      {props.sectionType === "screen" && (
        <div className="section-content-container">
          {activeScreenSizes.map((item, index) => {
            return (
              <ScreenSizeButton
                name={item.name}
                key={item.name}
                width={item.width}
                height={item.height}
                selected={selectedIndex === index}
                handler={(event: React.MouseEvent) => {
                  handleDeselect(event);
                  dispatch(selectScreenSize(index));
                  dispatch(updatePageSelectedScreen(item.name));
                }}
              ></ScreenSizeButton>
            );
          })}
          <AddScreenSize></AddScreenSize>
        </div>
      )}
    </div>
  );
}

export default SidePanelSection;
