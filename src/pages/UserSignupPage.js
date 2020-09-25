import React, { Component } from "react";
import { signUp } from "../api/apiCalls";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withTranslation } from "react-i18next";
import LanguageSelector from "../components/LanguageSelector";

class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordConfirm: null,
    pendingApiCall: false,
    errors: {},
  };

  onChangeInput = (event) => {
    const { name, value } = event.target;
    const { t } = this.props;
    const errors = { ...this.state.errors };
    errors[name] = undefined;

    if (name === "password" || name === "passwordConfirm") {
      if (name === "password" && value !== this.state.passwordConfirm) {
        errors.passwordConfirm = t("PassNotMatch");
      } else if (name === "passwordConfirm" && value !== this.state.password) {
        errors.passwordConfirm = t("PassNotMatch");
      } else {
        errors.passwordConfirm = undefined;
      }
    }

    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, displayName, password } = this.state;

    const body = { username, displayName, password };

    this.setState({ pendingApiCall: true });

    try {
      const resp = await signUp(body);
    } catch (error) {
      if (error.response.data.validationErrors) {
        this.setState({ errors: error.response.data.validationErrors });
      }
    }

    this.setState({ pendingApiCall: false });

    // signUp(body)
    //   .then((resp) => {
    //     this.setState({ pendingApiCall: false });
    //   })
    //   .catch((err) => {
    //     this.setState({ pendingApiCall: false });
    //   });
  };

  render() {
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordConfirm } = errors;
    const { t } = this.props;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            type="text"
            error={username}
            onChangeInput={this.onChangeInput}
          />
          <Input
            name="displayName"
            label={t("Display name")}
            type="text"
            error={displayName}
            onChangeInput={this.onChangeInput}
          />
          <Input
            name="password"
            label={t("Password")}
            type="password"
            error={password}
            onChangeInput={this.onChangeInput}
          />
          <Input
            name="passwordConfirm"
            label={t("Confirm Password")}
            type="password"
            error={passwordConfirm}
            onChangeInput={this.onChangeInput}
          />
          <ButtonWithProgress
            disabled={pendingApiCall || passwordConfirm !== undefined}
            onClick={this.onClickSignUp}
            pendingApiCall={pendingApiCall}
            text={t("Sign up")}
          />
        </form>
      </div>
    );
  }
}

export default withTranslation()(UserSignupPage);
