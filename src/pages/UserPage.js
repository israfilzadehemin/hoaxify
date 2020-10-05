import React, { useEffect, useState } from "react";
import { getUser } from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "../components/Spinner";
import HoaxFeed from "../components/HoaxFeed";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [notFound, setNotFound] = useState(false);

  const { username } = useParams();

  const pendingApiCall = useApiProgress("get", `/api/1.0/users/${username}`);

  useEffect(() => {
    setNotFound(false);
  }, [user]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const resp = await getUser(username);
        setUser(resp.data);
      } catch (err) {
        setNotFound(true);
      }
    };
    loadUser();
  }, [username]);

  let result = <ProfileCard user={user} />;
  const { t } = useTranslation();

  if (notFound) {
    result = <div className="alert alert-danger">{t("usernotfound")}</div>;
  }

  if (pendingApiCall) {
    result = <Spinner />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">{result}</div>
        <div className="col">
          <HoaxFeed />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
