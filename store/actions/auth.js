import { login, isLoggedIn, logout } from "../../utilities/auth";
export const LOGIN = "LOGIN";
export const SET_LOGIN = "SET_LOGIN";
export const LOGOUT = "LOGOUT";

export function performLogin() {
  return async (dispatch) => {
    const res = await login();
    dispatch({ type: LOGIN, userInfor: res });
  };
}

export function setLogin() {
  return async (dispatch) => {
    const res = await isLoggedIn();
    dispatch({ type: SET_LOGIN, isLoggedIn: res });
  };
}

export function performLogout() {
  return async (dispatch) => {
    const res = await logout();
    dispatch({ type: LOGOUT, isLoggedIn: false });
  };
}
