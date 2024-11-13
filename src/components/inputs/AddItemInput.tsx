import { ChangeEvent, useState } from "react";

interface AddItemInputProps {
  inputId: string;
  placeholder: string;
  maxChars?: number;
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

  return (
    <div className="add-item-input">
      <input
        type="text"
        id={props.inputId}
        aria-label={props.placeholder}
        placeholder={props.placeholder}
        value={val}
        onInput={handleValueChange}
      />
      <button className="btn" onClick={submitItem}>
        <i className="material-icons">add</i>
      </button>
    </div>
  );
}

export default AddItemInput;
