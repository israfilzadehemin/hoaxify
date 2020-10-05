import React, { useEffect, useState } from "react";
import { getUsers } from "../api/apiCalls";
import { useApiProgress } from "../shared/ApiProgress";
import { useTranslation } from "react-i18next";
import UserListItem from "./UserListItem";
import Spinner from "./Spinner";

const UserList = (props) => {
  const [page, setPage] = useState({
    content: [],
    size: 3,
    number: 0,
  });

  const [loadFailure, setLoadFailure] = useState(false);

  const pendingApiCall = useApiProgress("get", "/api/1.0/users?current");

  useEffect(() => {
    loadUsers();
  }, []);

  const onClickNext = () => {
    const nextPage = page.number + 1;
    loadUsers(nextPage);
  };

  const onClickPrev = () => {
    const prevPage = page.number - 1;
    loadUsers(prevPage);
  };

  const loadUsers = (page) => {
    setLoadFailure(false);
    getUsers(page)
      .then((resp) => {
        setPage(resp.data);
      })
      .catch((err) => {
        setLoadFailure(true);
      });
  };

  const { t } = useTranslation();
  const { content: users, last, first } = page;

  let actionDiv = (
    <div className="card-header">
      {first === false && (
        <button className="btn btn-sm btn-light" onClick={onClickPrev}>
          {t("Prev")}
        </button>
      )}
      {last === false && (
        <button
          className="btn btn-sm btn-light float-right"
          onClick={onClickNext}
        >
          {t("Next")}
        </button>
      )}
    </div>
  );
  if (pendingApiCall) {
    actionDiv = <Spinner />;
  }

  return (
    <div className="card">
      <h3 className="card-header">{t("Users")}</h3>
      <div className="list-group-flush">
        {users.map((u) => (
          <UserListItem user={u} key={u.username} />
        ))}
      </div>
      {actionDiv}
      {loadFailure && (
        <div className="text-danger text-center">{t("Error")}</div>
      )}
    </div>
  );
};

export default UserList;
