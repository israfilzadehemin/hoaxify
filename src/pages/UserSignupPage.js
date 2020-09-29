import React, { Component, useState } from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";
import { useApiProgress } from "../shared/ApiProgress";
import { useDispatch } from "react-redux";
import { signupHandler } from "../redux/authActions";

const UserSignupPage = (props) => {
  const [form, setForm] = useState({
    username: null,
    password: null,
    displayName: null,
    passwordConfirm: null,
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const onChangeInput = (event) => {
    const { name, value } = event.target;

    setErrors((prevError) => ({ ...prevError, [name]: undefined }));
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onClickSignUp = async (event) => {
    event.preventDefault();
    const { history } = props;
    const { push } = history;

    const { username, displayName, password } = form;
    const body = { username, displayName, password };

    try {
      await dispatch(signupHandler(body));
      push("/");
    } catch (error) {
      if (error.response.data.validationErrors) {
        setErrors(error.response.data.validationErrors);
      }
    }
  };

  const {
    username: usernameError,
    displayName: displayNameError,
    password: passwordError,
  } = errors;

  const pendingApiCallSignUp = useApiProgress("/api/1.0/users");
  const pendingApiCallLogin = useApiProgress("/api/1.0/auth");
  const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin;

  const { t } = useTranslation();

  let passwordConfirmError;

  if (form.password !== form.passwordConfirm) {
    passwordConfirmError = t("PassNotMatch");
  }

  return (
    <div className="container">
      <form>
        <h1 className="text-center">{t("Sign up")}</h1>
        <Input
          name="username"
          label={t("Username")}
          type="text"
          error={usernameError}
          onChangeInput={onChangeInput}
        />
        <Input
          name="displayName"
          label={t("Display name")}
          type="text"
          error={displayNameError}
          onChangeInput={onChangeInput}
        />
        <Input
          name="password"
          label={t("Password")}
          type="password"
          error={passwordError}
          onChangeInput={onChangeInput}
        />
        <Input
          name="passwordConfirm"
          label={t("Confirm Password")}
          type="password"
          error={passwordConfirmError}
          onChangeInput={onChangeInput}
        />
        <ButtonWithProgress
          disabled={pendingApiCall || passwordConfirmError !== undefined}
          onClick={onClickSignUp}
          pendingApiCall={pendingApiCall}
          text={t("Sign up")}
        />
      </form>
    </div>
  );
};

export default UserSignupPage;
