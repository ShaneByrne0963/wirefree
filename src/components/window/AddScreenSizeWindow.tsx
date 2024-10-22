import { defaultScreenSizes } from "../../context";

function AddScreenSizeWindow() {
  return (
    <>
      <fieldset id="default-screen-sizes">
        <legend>Default Screen Sizes</legend>
        {defaultScreenSizes.map((item, count) => {
          return (
            <div key={"screen-size-" + count}>
              <label>
                <input
                  type="radio"
                  name="select-screen-option"
                  className="with-gap"
                  value={count}
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

      <fieldset>
        <legend>Custom Screen Size</legend>
        <div id="add-custom-screen-size">
          <label>
            <input
              type="radio"
              name="select-screen-option"
              className="with-gap"
              value="Custom"
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
    </>
  );
}

export default AddScreenSizeWindow;
