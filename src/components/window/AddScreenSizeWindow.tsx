import { useSelector } from "react-redux";
import { defaultScreenSizes } from "../../context";
import { RootState } from "../../state/store";

function AddScreenSizeWindow() {
  // Finding the available default screen sizes to add
  let availableScreenSizes = [...defaultScreenSizes];
  const activeScreenSizes = useSelector(
    (state: RootState) => state.screenSize.activeScreens
  );
  activeScreenSizes.map((activeScreen) => {
    for (let i = 0; i < availableScreenSizes.length; i++) {
      let defaultScreen = availableScreenSizes[i];
      if (
        activeScreen.name === defaultScreen.name ||
        (activeScreen.width === defaultScreen.width &&
          activeScreen.height === defaultScreen.height)
      ) {
        availableScreenSizes.splice(i, 1);
        i--;
      }
    }
  });

  return (
    <div className="window-divided half">
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
                      defaultChecked={count === 0}
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
                  required
                />
              </div>
              <label>Dimensions</label>
              <div id="dimensions-container">
                <div>
                  <input id="dimension-x" type="number" placeholder="1920" />
                </div>
                <div className="multiplier">&times;</div>
                <div>
                  <input id="dimension-y" type="number" placeholder="1080" />
                </div>
                <div id="screen-size-units">Pixels</div>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div>
        <fieldset id="screen-size-preview">
          <legend>Preview</legend>
          <div></div>
        </fieldset>
      </div>
    </div>
  );
}

export default AddScreenSizeWindow;
