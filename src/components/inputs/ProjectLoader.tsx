import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  GridProps,
  setGridProperty,
  setGridStatus,
} from "../../state/slices/shapeSlice";
import {
  ScreenSizeState,
  setScreenSlice,
} from "../../state/slices/screenSizeSlice";
import { PageState, setPageSlice } from "../../state/slices/pageSlice";

export interface ProjectFormat {
  name: string;
  screenSizes: ScreenSizeState;
  pages: PageState;
  grid: GridProps;
}

function ProjectLoader() {
  const loaderRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  function handleInvalidInput() {
    console.log("Invalid Input");
  }

  function handleCorruptedFile() {
    console.log("File has missing data or has been corrupted");
  }

  // Ensure the file properties match the types they are setting
  function setProjectProperties(func: () => void) {
    try {
      func();
    } catch {
      handleCorruptedFile();
    }
  }

  function handleInput() {
    if (!loaderRef.current) return;
    const files = loaderRef.current.files;
    if (!(files && files[0])) return;

    // Read the data from the input
    const reader = new FileReader();
    reader.readAsText(files[0], "UTF-8");
    reader.onload = (event) => {
      if (!event.target?.result) return;
      const data = JSON.parse(event.target.result as string);
      if (
        !(
          data &&
          data.name &&
          data.version &&
          data.screenSizes &&
          data.pages &&
          data.grid
        )
      )
        return handleInvalidInput();

      // Screen size properties
      setProjectProperties(() => {
        dispatch(setScreenSlice(data.screenSizes));
      });

      // Page properties
      setProjectProperties(() => {
        dispatch(setPageSlice(data.pages));
      });

      // Grid properties
      setProjectProperties(() => {
        dispatch(setGridStatus(data.grid.enabled));
        dispatch(
          setGridProperty({
            axis: "x",
            value: data.grid.width,
            units: data.grid.widthUnits,
          })
        );
        dispatch(
          setGridProperty({
            axis: "y",
            value: data.grid.height,
            units: data.grid.heightUnits,
          })
        );
      });
    };
    reader.onerror = handleInvalidInput;
  }

  return (
    <input
      type="file"
      id="project-loader"
      accept=".json"
      onChange={handleInput}
      ref={loaderRef}
    />
  );
}

export default ProjectLoader;
