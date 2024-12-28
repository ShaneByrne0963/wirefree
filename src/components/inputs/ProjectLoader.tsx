import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  GridProps,
  setGridProperty,
  setGridStatus,
  setProjectName,
} from "../../state/slices/controlSlice";
import {
  ScreenSizeState,
  setScreenSlice,
} from "../../state/slices/screenSizeSlice";
import { PageState, setPageSlice } from "../../state/slices/pageSlice";
import { showMessage } from "../../state/slices/windowSlice";

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
    dispatch(
      showMessage({
        label: "Invalid File",
        bodyText: [
          "The file you are trying to load is invalid.",
          "Please try a different file",
        ],
      })
    );
  }

  function handleCorruptedFile() {
    dispatch(
      showMessage({
        label: "Invalid File",
        bodyText:
          "The file you are trying to load is missing data, or has been corrupted",
      })
    );
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
      let data: any = {};
      try {
        data = JSON.parse(event.target.result as string);
      } catch {
        handleInvalidInput();
      }
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

      // Set the project name
      dispatch(setProjectName(files[0].name.replace(".json", "")));

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
