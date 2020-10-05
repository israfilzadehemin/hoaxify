import React from "react";

const Input = (props) => {
  const { label, error, name, type, onChangeInput, defaultValue } = props;

  let className = "form-control";

  if (type === "file") {
    className += "-file";
  }

  if (error !== undefined) {
    className += " is-invalid";
  }

  return (
    <div className="form-group">
      <label className="">{label}</label>
      <input
        type={props.type}
        className={className}
        name={name}
        onChange={onChangeInput}
        defaultValue={defaultValue}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
