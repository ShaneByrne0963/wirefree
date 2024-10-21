import { defaultScreenSizes } from "../../context";

function AddScreenSizeWindow() {
  return (
    <>
      {defaultScreenSizes.map((item, count) => {
        return (
          <div key={"screen-size-" + count}>
            <label>
              <input
                type="radio"
                name="select-screen-option"
                className="with-gap"
                value={count}
              ></input>
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

      <label htmlFor="screen-size-name">Screen Size Name</label>
      <input id="screen-size-name" type="text"></input>
    </>
  );
}

export default AddScreenSizeWindow;
