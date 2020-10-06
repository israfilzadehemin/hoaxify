import React from "react";
import "./AutoUploadImage.css";

const AutoUploadImage = (props) => {
  const { image, uploading } = props;
  console.log(uploading);
  return (
    <div style={{ position: "relative" }}>
      <img src={image} className="img-thumbnail" alt="attachment" />
      <div className="overlay" style={{ opacity: uploading ? 1 : 0 }}>
        <div className="d-flex justify-content-center h-100">
          <div className="spinner-border text-light m-auto">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoUploadImage;
