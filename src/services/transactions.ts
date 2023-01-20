import axios from "axios";
import { TRANSACTION_TYPE } from "../components/Transactions/transaction.types";
import { API_BASE_URL } from "../constants/api";

const api = {
  getTransactions: async (walletId: string, transactiontype: TRANSACTION_TYPE): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/transactions/list?${transactiontype}=${walletId}`)
      .then((response) => response.data.data)
      .catch((e) => [])
  },
  getTransactionsById: async (transactionId: string): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/transactions/${transactionId}`)
      .then((response) => response.data.data)
      .catch((e) => [])
  },
};

export default api;
