import {
  REGISTER_USER,
  REGISTER_FAIL,
  LOGIN_USER,
  LOGIN_FAIL,
  LOGOUT_USER,
  USER_LOADED,
  UPDATE_DECKS,
  SAVE_DECK,
  AUTH_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: localStorage.getItem("token") !== null,
  user: null,
  saveDeck: false,
  authErrors: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return { ...state, user: payload };
    case REGISTER_USER:
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      return { ...state, isAuthenticated: true };
    case LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        saveDeck: false,
      };
    case UPDATE_DECKS:
      return { ...state, user: { ...state.user, decks: payload } };
    case SAVE_DECK:
      return { ...state, saveDeck: payload };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
      return { ...state, authErrors: payload };
    default:
      return state;
  }
}
