import { useDispatch, useSelector } from "react-redux";
import { defaultScreenSizes } from "../../../context";
import { RootState } from "../../../state/store";
import { ChangeEvent, useState } from "react";
import {
  addScreenSize,
  ScreenSize,
  selectScreenSize,
} from "../../../state/screen_size/screenSizeSlice";
import { WindowActionButtons } from "../Window";
import { setWindowActive } from "../../../state/window/windowSlice";

const windowLabel = "Add Screen Size";

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
    dispatch(selectScreenSize(activeScreenSizes.length));
    dispatch(setWindowActive([windowLabel, false]));
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
  let nameFeedback = "";
  let widthFeedback = "";
  let heightFeedback = "";
  let dimensionFeedback = "";
  let name = chosenScreen.name;
  if (!name.trim()) {
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
    // Cannot allow negative numbers or numbers above 9999
    if (widthInt <= 0) {
      isValid = false;
      widthFeedback = "Value must be greater than 0";
    } else if (widthInt >= 10000) {
      isValid = false;
      widthFeedback = "Value must be less than 10000";
    }
    if (heightInt <= 0) {
      isValid = false;
      heightFeedback = "Value must be greater than 0";
    } else if (heightInt >= 10000) {
      isValid = false;
      heightFeedback = "Value must be less than 10000";
    }
    // Ensuring the custom screen does not share either name or dimensions with any other active screen
    else if (isCustomScreen) {
      activeScreenSizes.map((activeScreen) => {
        if (activeScreen.name === name.trim()) {
          isValid = false;
          nameFeedback = "A screen size with that name already exists";
        } else if (
          activeScreen.width === widthInt &&
          activeScreen.height === heightInt
        ) {
          isValid = false;
          dimensionFeedback = `Screen size ${activeScreen.name} already has these dimensions`;
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
    <div
      className={
        (props.divided ? "window-divided" : "window-collapsed") + " half"
      }
    >
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
                      checked={count === screenChoice}
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
                checked={screenChoice === availableScreenSizes.length}
                onChange={() => setScreenChoice(availableScreenSizes.length)}
              />
              <span>Custom {availableScreenSizes.length === 0}</span>
            </label>

            <div id="custom-screen-size-inputs">
              <div>
                <label htmlFor="screen-size-name">Screen Size Name</label>
                <input
                  id="screen-size-name"
                  type="text"
                  placeholder="Name"
                  value={customScreen.name}
                  maxLength={20}
                  onChange={(event) => handleCustomInput(event)}
                  required
                />
                {nameFeedback && (
                  <div className="window-feedback">{nameFeedback}</div>
                )}
              </div>
              <label>Dimensions</label>
              <div id="dimensions-container">
                <div>
                  <input
                    id="dimension-x"
                    type="number"
                    placeholder="Width"
                    value={customScreen.width}
                    min={0}
                    max={9999}
                    onChange={(event) => handleCustomInput(event)}
                  />
                  {widthFeedback && (
                    <div className="window-feedback">{widthFeedback}</div>
                  )}
                </div>
                <div className="multiplier">&times;</div>
                <div>
                  <input
                    id="dimension-y"
                    type="number"
                    placeholder="Height"
                    value={customScreen.height}
                    min={0}
                    max={9999}
                    onChange={(event) => handleCustomInput(event)}
                  />
                  {heightFeedback && (
                    <div className="window-feedback">{heightFeedback}</div>
                  )}
                </div>
                <div id="screen-size-units">Pixels</div>
              </div>
              {dimensionFeedback && (
                <div className="window-feedback">{dimensionFeedback}</div>
              )}
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
          windowLabel={windowLabel}
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
