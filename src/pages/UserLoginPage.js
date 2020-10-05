import React, { Component, useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useTranslation } from "react-i18next";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { loginHandler, loginSuccess } from "../redux/authActions";

const UserLoginPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const onClickLogin = async (event) => {
    event.preventDefault();
    const creds = { username, password };

    const { history } = props;
    const { push } = history;

    setError(undefined);

    try {
      await dispatch(loginHandler(creds));
      push("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const { t } = useTranslation();

  const pendingApiCall = useApiProgress("post", "/api/1.0/auth");

  const buttonEnabled = username && password;

  return (
    <div className="container">
      <h1 className="text-center">{t("Login")}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Input
        label={t("Username")}
        name="username"
        onChangeInput={(event) => setUsername(event.target.value)}
      />
      <Input
        label={t("Password")}
        name="password"
        type="password"
        onChangeInput={(event) => setPassword(event.target.value)}
      />
      <ButtonWithProgress
        onClick={onClickLogin}
        disabled={!buttonEnabled || pendingApiCall}
        pendingApiCall={pendingApiCall}
        text={t("Login")}
      />
    </div>
  );
};

export default UserLoginPage;
