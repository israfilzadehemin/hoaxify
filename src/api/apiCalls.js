import axios from "axios";

export const signUp = (body) => {
  return axios.post("/api/1.0/users", body);
};

export const login = (creds) => {
  return axios.post("/api/1.0/auth", {}, { auth: creds });
};

export const changeLang = (lang) => {
  axios.defaults.headers["accept-language"] = lang;
};

export const getUsers = (page = 0, size = 3) => {
  return axios.get(`/api/1.0/users?current=${page}&size=${size}`);
};

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
  if (isLoggedIn) {
    const authorizationHeaderValue = `Basic ${btoa(username + ":" + password)}`;
    axios.defaults.headers["Authorization"] = authorizationHeaderValue;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const getUser = (username) => {
  return axios.get(`/api/1.0/users/${username}`);
};

export const updateUser = (username, body) => {
  return axios.put(`/api/1.0/users/${username}`, body);
};

export const postHoax = (hoax) => {
  return axios.post("/api/1.0/hoaxes", hoax);
};

export const getHoaxes = (username, page = 0) => {
  const path = username
    ? `/api/1.0/users/${username}/hoaxes?current=`
    : "/api/1.0/hoaxes?current=";
  return axios.get(path + page);
};

export const getOldHoaxes = (id, username) => {
  const path = username
    ? `/api/1.0/users/${username}/hoaxes/${id}`
    : `/api/1.0/hoaxes/${id}`;
  return axios.get(path);
};

export const getNewHoaxCount = (id, username) => {
  const path = username
    ? `/api/1.0/users/${username}/hoaxes/${id}?count=true`
    : `/api/1.0/hoaxes/${id}?count=true`;
  return axios.get(path);
};

export const getNewHoaxes = (id, username) => {
  const path = username
    ? `/api/1.0/users/${username}/hoaxes/${id}?direction=after`
    : `/api/1.0/hoaxes/${id}?direction=after`;
  return axios.get(path);
};

export const postHoaxAttachment = (attachment) => {
  return axios.post("/api/1.0/hoax-attachment", attachment);
};

export const deleteHoax = (id) => {
  return axios.delete(`/api/1.0/hoaxes/${id}`);
};

export const deleteUser = (username) => {
  return axios.delete(`/api/1.0/users/${username}`);
};
