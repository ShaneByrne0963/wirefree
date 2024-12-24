import { useDispatch, useSelector } from "react-redux";
import { deselectAllShapes, selectShape } from "../state/slices/controlSlice";
import { deleteShape } from "../state/slices/pageSlice";
import { RootState } from "../state/store";

function deselectShapes() {
  const dispatch = useDispatch();
  const selectedTool = useSelector((state: RootState) => state.controls.selectedTool);

  return (event: React.MouseEvent) => {
    dispatch(deselectAllShapes());

    if (!selectedTool) {
      const element = event.target as HTMLElement;
      
      // Check if the clicked element is a shape
      let foundElement = null;
      if (element.classList.contains("canvas-element")) {
        dispatch(selectShape(element.id));
        foundElement = element;
      } else {
        // If not, check if it is a child of one
        const parentElement = element.closest(".canvas-element") as HTMLElement;
        if (parentElement) {
          dispatch(selectShape(parentElement.id));
          foundElement = parentElement;
        }
      }
      // If any text inputs have no text entered, delete them
      document.querySelectorAll(".canvas-element.selected").forEach((element) => {
        if (
          element.classList.contains("canvas-text") &&
          element.id !== foundElement?.id &&
          !element.textContent
        ) {
          const layer = element.getAttribute("data-layer") || "";
          const index = parseInt(element.getAttribute("data-index") || "0");
          dispatch(deleteShape([layer, index]));
        }
      });
    }
  };
}

export default deselectShapes;