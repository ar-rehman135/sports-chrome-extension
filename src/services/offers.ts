import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const api = {
  getMyOffers: async (): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/offer/received`)
      .then((response) => response.data);
  },
  createOffer: async (offerData: any) => {
    return axios
      .post(`${API_BASE_URL}/api/offer/create`, offerData)
      .then((response) => response.data);
  },
};

export default api;
