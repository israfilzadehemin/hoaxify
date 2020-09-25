import React, { Component } from "react";
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";
import axios from "axios";

class UserLoginPage extends Component {
  state = {
    username: null,
    password: null,
    error: null,
    pendingApiCall: false,
  };

  componentDidMount() {
    axios.interceptors.request.use((req) => {
      this.setState({ pendingApiCall: true });
      return req;
    });

    axios.interceptors.response.use(
      (resp) => {
        return resp;
      },
      (err) => {
        this.setState({ pendingApiCall: false });
        throw err;
      }
    );
  }

  onChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickLogin = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const creds = { username, password };

    this.setState({ error: null });

    try {
      await login(creds);
    } catch (err) {
      this.setState({ error: err.response.data.message });
    }
  };

  render() {
    const { t } = this.props;
    const { username, password, error, pendingApiCall } = this.state;
    const buttonEnabled = username && password;
    return (
      <div className="container">
        <h1 className="text-center">{t("Login")}</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <Input
          label={t("Username")}
          name="username"
          onChangeInput={this.onChangeInput}
        />
        <Input
          label={t("Password")}
          name="password"
          type="password"
          onChangeInput={this.onChangeInput}
        />
        <ButtonWithProgress
          onClick={this.onClickLogin}
          disabled={!buttonEnabled || pendingApiCall}
          pendingApiCall={pendingApiCall}
          text={t("Login")}
        />
      </div>
    );
  }
}

export default withTranslation()(UserLoginPage);
