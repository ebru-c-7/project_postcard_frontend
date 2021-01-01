import * as actions from "./actionTypes";
import axios from "axios";

const authStart = () => ({ type: actions.AUTH_START });

const authFail = (error) => ({ type: actions.AUTH_FAIL, error });

const authSuccess = (token, name) => ({
  type: actions.AUTH_SUCCESS,
  token,
  username: name,
});

const autoLogout = (expTime) => {
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/login`;
    axios
      .post(url, loginData)
      .then((response) => {
        const duration = 3600000; //1hr in ms
        const expiration = new Date(new Date().getTime() + duration);
        const { token, name } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("expIn", expiration);
        localStorage.setItem("username", name);
        dispatch(authSuccess(token, name));
        dispatch(autoLogout(duration));
      })
      .catch((error) => {
        dispatch(
          authFail(
            error.response.data.message ||
              "Something went wrong :( Please refresh the page!"
          )
        );
      });
  };
};

export const signup = (email, password, name) => {
  return (dispatch) => {
    dispatch(authStart());
    const signupData = {
      email,
      password,
      name,
    };
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/signup`;
    axios
      .put(url, signupData)
      .then((response) => {
        const duration = 3600000; //1hr in ms
        const expiration = new Date(new Date().getTime() + duration);
        let { token, name } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("expIn", expiration);
        localStorage.setItem("username", name);
        dispatch(authSuccess(token, name));
        dispatch(autoLogout(duration));
      })
      .catch((error) => {
        dispatch(
          authFail(
            error.response.data.message ||
              "Something went wrong :( Please refresh the page!"
          )
        );
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
        dispatch(authSuccess(token, name));
        dispatch(autoLogout(time.getTime() - new Date().getTime())); //in ms
      }
    }
  };
};

export const errorHandleAuth = () => ({ type: actions.ERROR_HANDLE });
