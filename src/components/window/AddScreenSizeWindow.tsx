import { useDispatch, useSelector } from "react-redux";
import { defaultScreenSizes } from "../../context";
import { RootState } from "../../state/store";
import { ChangeEvent, useState } from "react";
import {
  addScreenSize,
  ScreenSize,
} from "../../state/screenSize/screenSizeSlice";
import { WindowActionButtons } from "./Window";
import { closeWindow } from "../../state/window/windowSlice";

function compareScreenSizes(screenSize1: ScreenSize, screenSize2: ScreenSize) {
  return (
    screenSize1.name == screenSize2.name ||
    (screenSize1.width === screenSize2.width &&
      screenSize1.height === screenSize2.height)
  );
}

interface AddScreenSizeWindowProps {
  divided: boolean;
}

function AddScreenSizeWindow(props: AddScreenSizeWindowProps) {
  // Finding the available default screen sizes to add
  let availableScreenSizes = [...defaultScreenSizes];
  const activeScreenSizes = useSelector(
    (state: RootState) => state.screenSize.activeScreens
  );

  // Finding the default screen sizes that can be added
  activeScreenSizes.map((activeScreen) => {
    for (let i = 0; i < availableScreenSizes.length; i++) {
      let defaultScreen = availableScreenSizes[i];
      if (compareScreenSizes(activeScreen, defaultScreen)) {
        availableScreenSizes.splice(i, 1);
        i--;
      }
    }
  });

  // Redux values
  const dispatch = useDispatch();
  function handleAddScreen(props: {
    name: string;
    width: number;
    height: number;
  }) {
    dispatch(addScreenSize(props));
    dispatch(closeWindow());
  }

  // State declarations
  const [screenChoice, setScreenChoice] = useState(0);
  const [customScreen, setCustomScreen] = useState({
    name: "",
    width: "",
    height: "",
  });

  // Finding the selected screen, or if a custom screen is selected
  let isCustomScreen = false;
  let chosenScreen = null;
  if (screenChoice < availableScreenSizes.length) {
    chosenScreen = availableScreenSizes[screenChoice];
  } else {
    chosenScreen = { ...customScreen };
    isCustomScreen = true;
  }

  // Creating the CSS for the preview
  let previewCss = {
    "--aspect-ratio": 1,
    display: "none",
  };

  // Only allowing the CSS if the dimensions are valid
  let isValid = true;
  let name = chosenScreen.name;
  if (!name) {
    isValid = false;
  }

  let widthInt =
    typeof chosenScreen.width === "string"
      ? parseInt(chosenScreen.width)
      : chosenScreen.width;

  let heightInt =
    typeof chosenScreen.height === "string"
      ? parseInt(chosenScreen.height)
      : chosenScreen.height;

  if (widthInt && heightInt) {
    previewCss = {
      "--aspect-ratio": widthInt / heightInt,
      display: "block",
    };
    // Cannot allow negative numbers
    if (widthInt <= 0 || heightInt <= 0) {
      isValid = false;
    }
    // Ensuring the custom screen does not share either name or dimensions with any other active screen
    else if (isCustomScreen) {
      activeScreenSizes.map((activeScreen) => {
        if (
          compareScreenSizes(activeScreen, {
            name: name,
            width: widthInt,
            height: heightInt,
          })
        ) {
          isValid = false;
        }
      });
    }
  } else {
    isValid = false;
  }

  // Updates the custom screen inputs
  function handleCustomInput(event: ChangeEvent<HTMLInputElement>) {
    let updateInput = event.target;
    let previousCustomSize = { ...customScreen };
    if (updateInput.id === "screen-size-name") {
      previousCustomSize.name = updateInput.value;
    } else if (updateInput.id === "dimension-x") {
      previousCustomSize.width = `${parseInt(updateInput.value)}`;
    } else {
      previousCustomSize.height = `${parseInt(updateInput.value)}`;
    }
    setCustomScreen(previousCustomSize);
  }

  return (
    <div className={(props.divided ? "window-divided " : "") + "half"}>
      <div>
        {availableScreenSizes.length > 0 && (
          <fieldset id="default-screen-sizes">
            <legend>Default Screen Sizes</legend>
            {availableScreenSizes.map((item, count) => {
              return (
                <div key={"screen-size-" + count}>
                  <label>
                    <input
                      type="radio"
                      name="select-screen-option"
                      className="with-gap"
                      value={count}
                      defaultChecked={count === screenChoice}
                      onChange={() => setScreenChoice(count)}
                    />
                    <span className="screen-size-radio-text">
                      <div>
                        <div>{item.name}</div>
                        <small>
                          {item.width}px &times; {item.height}px
                        </small>
                      </div>
                    </span>
                  </label>
                </div>
              );
            })}
          </fieldset>
        )}

        <fieldset>
          <legend>Custom Screen Size</legend>
          <div id="add-custom-screen-size">
            <label>
              <input
                type="radio"
                name="select-screen-option"
                className="with-gap"
                value="Custom"
                defaultChecked={availableScreenSizes.length === 0}
                onChange={() => setScreenChoice(availableScreenSizes.length)}
              />
              <span>Custom</span>
            </label>

            <div id="custom-screen-size-inputs">
              <div>
                <label htmlFor="screen-size-name">Screen Size Name</label>
                <input
                  id="screen-size-name"
                  type="text"
                  placeholder="Name"
                  value={customScreen.name}
                  onChange={(event) => handleCustomInput(event)}
                  required
                />
              </div>
              <label>Dimensions</label>
              <div id="dimensions-container">
                <div>
                  <input
                    id="dimension-x"
                    type="number"
                    placeholder="Width"
                    value={customScreen.width}
                    onChange={(event) => handleCustomInput(event)}
                  />
                </div>
                <div className="multiplier">&times;</div>
                <div>
                  <input
                    id="dimension-y"
                    type="number"
                    placeholder="Height"
                    value={customScreen.height}
                    onChange={(event) => handleCustomInput(event)}
                  />
                </div>
                <div id="screen-size-units">Pixels</div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div id="screen-size-final">
        <fieldset id="screen-size-preview">
          <legend>Preview</legend>
          <div style={previewCss}></div>
        </fieldset>
        <br />
        <WindowActionButtons
          text="Add"
          icon="add"
          canSubmit={isValid}
          action={() =>
            handleAddScreen({
              name: name,
              width: widthInt,
              height: heightInt,
            })
          }
        ></WindowActionButtons>
      </div>
    </div>
  );
}

export default AddScreenSizeWindow;
