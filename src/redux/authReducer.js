import * as actionTypes from "./actionTypes";

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: undefined,
  password: undefined,
};

const authReducer = (state = defaultState, action) => {
  if (action.type === actionTypes.LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type === actionTypes.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedIn: true,
    };
  } else if (action.type === actionTypes.UPDATE_SUCCESS) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
};

export default authReducer;
