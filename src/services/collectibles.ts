import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { getErrorMessage } from "./utils";

const api = {
  getAllCollectibles: async (userId: any): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/nfts/list?owner_id=${userId}`)
      .then((response: any) => response.data.data);
  },
  getCollectibleById: async (id: string): Promise<any> => {
    return axios
      .get(`${API_BASE_URL}/nfts/${id}`)
      .then((response: any) => response.data.data);
  },
  giftCollectible: async (nftId: string, contactIds: string[]): Promise<any> => {
    return axios
      .post(`${API_BASE_URL}/nfts/${nftId}/gift`, {
        contactIds,
      })
      .then((response: any) => response.data.data)
      .catch((e) => {
        return {
          error: getErrorMessage(e)
        }
      });
  },
};

export default api;
