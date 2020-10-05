import React from "react";

const ButtonWithProgress = (props) => {
  const { pendingApiCall, onClick, disabled, text, className } = props;
  return (
    <button
      className={className ? className : "col-12 btn btn-lg btn-success"}
      onClick={onClick}
      disabled={disabled}
    >
      {pendingApiCall && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      {text}
    </button>
  );
};

export default ButtonWithProgress;
