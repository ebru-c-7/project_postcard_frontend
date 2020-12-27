/* eslint-disable no-unused-vars */
import * as actions from "./actionTypes";
import axios from "axios";

const authStart = () => ({ type: actions.AUTH_START });

const authFail = (error) => ({ type: actions.AUTH_FAIL, error });

const authSuccess = ({ token, name }) => ({
  type: actions.AUTH_SUCCESS,
  token,
  username: name,
});

export const autoLogout = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime);
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expIn");
  return {
    type: actions.AUTH_LOGOUT,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const loginData = {
      email,
      password,
    };
    console.log(loginData);
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
    axios
      .post(url, loginData)
      .then((response) => {
        console.log(response);
        const duration = 3600000; //1hr in ms
        const expiration = new Date(new Date().getTime() + duration);
        const token = response.data.token;
        const name = response.data.name;
        localStorage.setItem("token", token);
        localStorage.setItem("expIn", expiration);
        localStorage.setItem("username", name);
        dispatch(authSuccess({token, name}));
        dispatch(autoLogout(duration));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.message));
      });
    }
};

export const signup = (email, password, name) => {
  return (dispatch) => {
    dispatch(authStart());
    const signupData = {
      email,
      password,
      name
    };
    console.log(signupData);
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/signup`;
    axios
      .put(url, signupData)
      .then((response) => {
        console.log(response);
        const duration = 3600000; //1hr in ms
        const expiration = new Date(new Date().getTime() + duration);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expIn", expiration);
        localStorage.setItem("username", response.data.name);
        dispatch(authSuccess(response.data)); //data object with token and username properties
        dispatch(autoLogout(duration));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.message));
      });
  };
};

export const autoLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const time = new Date(localStorage.getItem("expIn"));
      if (time < new Date()) {
        dispatch(logout());
      } else {
        const name = localStorage.getItem("username");
        const data = {token, name}
        dispatch(authSuccess(data));
        dispatch(autoLogout(time.getTime()-new Date().getTime())); //in ms
      }
    }
  };
};

export const errorHandleAuth = () => ({ type: actions.ERROR_HANDLE });
