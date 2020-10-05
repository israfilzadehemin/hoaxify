import React from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";

const HoaxView = (props) => {
  const { hoax } = props;
  const { user, content, timestamp } = hoax;
  const { username, displayName, image } = user;

  const { i18n } = useTranslation();

  const formatted = format(timestamp, i18n.language);
  return (
    <div className="card p-1 mb-2">
      <div className="d-flex">
        <ProfileImageWithDefault
          image={image}
          width="35"
          height="35"
          className="rounded-circle"
        />
        <div className="flex-fill pl-2">
          <Link
            to={`/user/${username}`}
            className="nav-link d-flex justify-content-between"
          >
            <h6 className="">
              {displayName}@{username}
            </h6>
            <span>-</span>
            <span>{formatted}</span>
          </Link>
        </div>
      </div>
      <div className="pl-5">{content}</div>
    </div>
  );
};

export default HoaxView;
