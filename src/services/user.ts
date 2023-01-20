import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { CreateAccountData } from "../context/models";

const api = {
  getAccountDetails: async () => {
    return axios
      .get(`${API_BASE_URL}/user/details`)
      .then((response) => response.data);
  },
  createAccount: async (data: CreateAccountData) => {
    return axios
      .post(`${API_BASE_URL}/users`, data)
      .then((response) => response.data);
  },
  loginWithWallet: async (walletID: string) => {
    return axios
      .post(`${API_BASE_URL}/users/login`, { walletID })
      .then((response) => response.data);
  },
  verifyUser: async (walletName: string, code: string) => {
    return axios
      .post(`${API_BASE_URL}/users/login/verify`, {
        OTP: code,
        walletID: walletName,
      })
      .then((response) => response.data);
  },
  createPasscode: async (code: string) => {
    return axios
      .post(`${API_BASE_URL}/user/passcode`, { code })
      .then((response) => response.data);
  },
};

export default api;
