import { act } from "react-dom/test-utils";
import { clearAuthorizationHeader, login, signUp } from "../api/apiCalls";
import * as actionTypes from "./actionTypes";

export const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const updateSuccess = (displayName, image) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    payload: {
      displayName,
      image
    },
  };
};

export const loginHandler = (credentials) => {
  return async (dispatch) => {
    const response = await login(credentials);
    const authState = {
      ...response.data,
      password: credentials.password,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};

export const signupHandler = (user) => {
  return async (dispatch) => {
    const response = await signUp(user);
    await dispatch(loginHandler(user));
    return response;
  };
};
