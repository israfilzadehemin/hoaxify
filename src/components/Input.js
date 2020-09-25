import React from "react";

const Input = (props) => {
  const { label, error, name, onChangeInput } = props;
  const className = error ? "form-control is-invalid" : "form-control";
  return (
    <div className="form-group">
      <label className="">{label}</label>
      <input
        type={props.type}
        className={className}
        name={name}
        onChange={onChangeInput}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default Input;
