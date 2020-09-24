import React, { Component } from "react";
import { signUp } from "../api/apiCalls";

class UserSignupPage extends Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordConfirm: null,
    pendingApiCall: false,
  };

  onChangeInput = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  onClickSignUp = async (event) => {
    event.preventDefault();

    const { username, displayName, password } = this.state;

    const body = { username, displayName, password };

    this.setState({ pendingApiCall: true });

    try {
      const resp = await signUp(body);
    } catch (error) {}

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
    const { pendingApiCall } = this.state;

    return (
      <div className="container">
        <form>
          <h1 className="text-center">Sign up</h1>
          <div className="form-group">
            <label className="">Username</label>
            <input
              className="form-control"
              name="username"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label className="">Display name</label>
            <input
              className="form-control"
              name="displayName"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label className="">Password</label>
            <input
              className="form-control"
              name="password"
              type="password"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="form-group">
            <label className="">Password confirm</label>
            <input
              className="form-control"
              name="passwordConfirm"
              type="password"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="text-center">
            <button
              disabled={pendingApiCall}
              className="col-12 btn btn-lg btn-success"
              onClick={this.onClickSignUp}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}{" "}
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserSignupPage;
