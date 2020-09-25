import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/1.0/users", body);
};

export const changeLang = (lang) => {
  axios.defaults.headers["accept-language"] = lang;
};
