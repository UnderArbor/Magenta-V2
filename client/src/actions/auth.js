import axios from "axios";
import {
  REGISTER_USER,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT_USER,
  AUTH_ERROR,
  OPEN_DECK_LIST,
} from "./types";

import { savingDeck } from "./deck";

import setAuthToken from "../utils/functions/setAuthToken";

export const loadUser = (newAuth) => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.token);
  }
  try {
    await axios.get("/api/auth").then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      if (newAuth) {
        // dispatch({ type: OPEN_DECK_LIST, payload: true });
        dispatch(savingDeck(true));
      }
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const registerUser = (userName, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    userName,
    password,
    email,
  });
  try {
    const res = await axios.post("api/user", body);
    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });
    dispatch(loadUser(true));
    return true;
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => console.log(error));
    }
    dispatch({
      type: REGISTER_FAIL,
      payload: errors,
    });
    return false;
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    await axios.post("api/auth", body).then((res) => {
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
      dispatch(loadUser(true));
    });
    return true;
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error.msg);

    if (errors) {
      errors.forEach((error) => console.log(error));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
    return false;
  }
};

// Logout / Clear Profile
export const logoutUser = () => (dispatch) => {
  setAuthToken(null);
  dispatch({
    type: LOGOUT_USER,
  });
};
