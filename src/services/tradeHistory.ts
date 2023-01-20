import axios from "axios";
import { API_BASE_URL } from "../constants/api";
const api = {
  getNftTransactions: async (id: any): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/transactions/nft/${id}`)
      .then((response) => response.data.data);
  },
};
export default api;
