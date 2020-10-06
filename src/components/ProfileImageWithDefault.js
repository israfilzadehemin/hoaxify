import React from "react";
import defaultPicture from "../assets/profile.png";

const profilePictureWithDefault = (props) => {
  const { image, tempimage } = props;
  let imgSrc = defaultPicture;

  if (image) {
    imgSrc = "images/profile" + image;
  }

  return (
    <img
      src={tempimage || imgSrc}
      alt={props.username}
      {...props}
      style={{ objectFit: "cover" }}
      onError={(event) => {
        event.target.src = defaultPicture;
      }}
    />
  );
};

export default profilePictureWithDefault;
