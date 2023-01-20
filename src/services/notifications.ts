import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const api = {
  getUnreadNotificationsAmount: async (): Promise<any> => {
    return axios
      .get(`${API_BASE_URL}/notifications/unread/amount`)
      .then((response) => response.data);
  },
  getAllNotifications: async (): Promise<Array<any>> => {
    return axios
      .get(`${API_BASE_URL}/notifications`)
      .then((response) => response.data);
  },
  markAllNotificationsAsRead: async (): Promise<any> => {
    return axios
      .put(`${API_BASE_URL}/notifications/read`)
      .then((response) => response.data);
  },
};

export default api;
