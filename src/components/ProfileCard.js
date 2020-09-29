import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileCard = (props) => {
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));

  const routeParams = useParams();
  const pathUsername = routeParams.username;
  let message = "Not available";

  if (pathUsername === loggedInUsername) {
    message = "Available";
  }

  return <div>{message}</div>;
};

export default ProfileCard;
