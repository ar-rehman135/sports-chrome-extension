import { AxiosError } from "axios";
import decode from "jwt-decode"; // import dependency
import React from "react";
import { ContextMain } from "../context/store";

export const filterArrayObjectByValue = (
  value: string,
  arrayObj: Array<any>
) => {
  return value === ""
    ? arrayObj
    : arrayObj.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(value.toLowerCase());
    });
};

export const getUserIdFromToken = () => {
  const [state] = React.useContext(ContextMain);
  const accessToken = state && state.token ? state.token : "";
  const nearToken = accessToken && decode(accessToken);
  return nearToken;
};

export const getErrorMessage = (json: AxiosError) => {
  return json?.response?.data?.message
    ? json?.response?.data?.message
    : json?.response?.data?.errors.length
      ? json?.response?.data?.errors
      : "Error while processing your request";
};

export const getUserId = () => {
  let userId = "";
  const [state] = React.useContext(ContextMain);
  if (state.user && state.user.walletName) {
    userId = state.user.walletName;
  }
  return userId;
}

export const getToken = () => {
  let token = "";
  const [state] = React.useContext(ContextMain);
  if (state.token) {
    token = state.token;
  }
  return token;
}

export const getAutoLoggedIn = () => {
  const [state] = React.useContext(ContextMain);
  return state?.setting?.autoLogin
}

export const removeNumbersFromString = (data: string) => {
  return data.replace(/[^A-Za-z ]+/g, '');
};