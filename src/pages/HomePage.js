import React from "react";
import UserList from "../components/UserList";
import HoaxSubmit from "../components/HoaxSubmit";
import { useSelector } from "react-redux";
import HoaxFeed from "../components/HoaxFeed";

const Homepage = (props) => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <div>{isLoggedIn && <HoaxSubmit />}</div>
          <HoaxFeed />
        </div>

        <div className="col-7">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
