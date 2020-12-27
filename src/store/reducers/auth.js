/* eslint-disable no-unused-vars */
import * as actions from "../actions/actionTypes";
import { updateObject } from "../actions/Utility";

const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    case actions.AUTH_LOGOUT:
      return authLogout(state, action);
      case actions.ERROR_HANDLE:
        return errorHandle(state, action);
    default:
      return state;
  } 
};

export default reducer;

function errorHandle(state, action) {
  return updateObject(state, {
    error: null,
  });
}

function authStart(state, action) {
  return updateObject(state, {
    loading: true,
    error: null,
  });
}

function authSuccess(state, action) {
  console.log("authsuccess");
  console.log("username: ", action.username);
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.token,
    username: action.username,
  });
}

function authFail(state, action) {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
}

function authLogout(state, action) {
  return updateObject(state, {
    token: null,
    username: null,
    loading: false
  });
}
