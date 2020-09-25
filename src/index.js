import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import UserSignupPage from "./pages/UserSignupPage";
import UserLoginPage from "./pages/UserLoginPage";
import LanguageSelector from "./components/LanguageSelector";
import * as serviceWorker from "./serviceWorker";
import "./bootstrap-override.scss";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <UserSignupPage />
    <LanguageSelector />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
