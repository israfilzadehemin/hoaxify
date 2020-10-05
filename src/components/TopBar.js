import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../assets/hoaxify.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authActions";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = (props) => {
  const { t } = useTranslation();

  const { username, isLoggedIn, displayName, image } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    displayName: store.displayName,
    image: store.image,
  }));

  const [menuVisible, setMenuVisible] = useState(false);

  const menuArea = useRef(null);

  useEffect(() => {
    document.addEventListener("click", menuClickTracker);
    return () => document.removeEventListener("click", menuClickTracker);
  }, [isLoggedIn]);

  const menuClickTracker = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  const dispatch = useDispatch();

  const onLogoutSuccess = () => {
    dispatch(logoutSuccess());
  };

  let links = (
    <ul className="navbar-nav ml-auto">
      <li>
        <Link className="nav-link" to="/login">
          {t("Login")}
        </Link>
      </li>
      <li>
        <Link className="nav-link" to="/signup">
          {t("Sign up")}
        </Link>
      </li>
    </ul>
  );

  if (isLoggedIn) {
    let dropdownClass = "dropdown-menu p-0 shadow";

    if (menuVisible) {
      dropdownClass += " show";
    }

    links = (
      <ul className="navbar-nav ml-auto" ref={menuArea}>
        <li
          className="d-flex nav-item dropdown"
          style={{ cursor: "pointer" }}
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <ProfileImageWithDefault
            image={image}
            width="32"
            height="32"
            className="rounded-circle m-auto"
          />
          <span className="nav-link dropdown-toggle">{displayName}</span>
          <div className={dropdownClass}>
            <Link className="dropdown-item" to={`/user/${username}`}>
              {t("MyProfile")}
            </Link>
            <span
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={onLogoutSuccess}
            >
              {t("Logout")}
            </span>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <div className="shadow-sm bg-light mb-3">
      <nav className="navbar-expand navbar navbar-light bg-light container">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="60" alt="Hoaxify" /> Hoaxify
        </Link>
        {links}
      </nav>
    </div>
  );
};

export default TopBar;
