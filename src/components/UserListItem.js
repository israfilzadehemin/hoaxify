import React from "react";
import defaultPic from "../assets/profile.png";
import { Link } from "react-router-dom";
import ProfilePictureWithDefault from "./ProfileImageWithDefault";

const UserListItem = (props) => {
  const { user } = props;
  const { username, displayName, image } = user;

  return (
    <Link
      to={`user/${username}`}
      className="list-group-item list-group-action nav-link"
    >
      <ProfilePictureWithDefault
        className="rounded-circle"
        width="32"
        height="32"
        alt={`${username}`}
        image={image}
      />
      <span className="pl-3">{`${username}@${displayName}`}</span>
    </Link>
  );
};

export default UserListItem;
