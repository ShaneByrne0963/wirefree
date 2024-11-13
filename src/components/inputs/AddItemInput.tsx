import { ChangeEvent, useState } from "react";

interface AddItemInputProps {
  inputId: string;
  placeholder: string;
  maxLength?: number;
  existingVals?: string[];
  onSuccess: (result: string) => any;
}

function AddItemInput(props: AddItemInputProps) {
  const [val, setVal] = useState("");

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    setVal(event.target.value);
  }

  function submitItem() {
    props.onSuccess(val);
    setVal("");
  }

  let feedback = "";
  if (props.existingVals !== undefined) {
    if (props.existingVals.indexOf(val) >= 0) {
      feedback = "Value already exists";
    }
  }

  return (
    <>
      <div className="add-item-input">
        <input
          type="text"
          id={props.inputId}
          aria-label={props.placeholder}
          placeholder={props.placeholder}
          value={val}
          onInput={handleValueChange}
          maxLength={props.maxLength}
        />
        <button
          className="btn"
          onClick={submitItem}
          disabled={val === "" || feedback !== ""}
        >
          <i className="material-icons">add</i>
        </button>
      </div>
      {feedback !== "" && <div className="window-feedback">{feedback}</div>}
    </>
  );
}

export default AddItemInput;
