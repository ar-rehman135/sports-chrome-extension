import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const api = {
  getAccounts: async (user_id:string): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/wallets?user=${user_id}`)
      .then((response) => response.data);
  },
  getWalletBalance: async (walletId: string): Promise<any> => {
    return axios
      .get(`${API_BASE_URL}/wallets/balance/${walletId}`)
      .then((response) => response.data);
  },
};

export default api;
