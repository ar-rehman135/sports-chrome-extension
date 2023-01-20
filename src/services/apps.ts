import axios from "axios";
import { API_BASE_URL } from "../constants/api";
import { getErrorMessage } from "./utils";

export interface ConnectedApp {
  appName: string;
  version: string;
  updated: number;
  developer: string;
  categoryId: string;
  created: number;
  appId: string;
  description: string;
  ownerId: string;
  tags: string[];
  connectedUsers?: number;
  appIcon?: string;
}

const api = {
  getApps: async () => {
    return axios
      .get(`${API_BASE_URL}/apps`)
      .then((response) => response.data.data);
  },
  getAppById: async (id: string) => {
    return axios
      .get(`${API_BASE_URL}/apps/${id}`)
      .then((response) => response.data.data);
  },
  searchApps: async (appName: string) => {
    return axios
      .get(`${API_BASE_URL}/apps?search=${appName}`)
      .then((response) => response.data.data);
  },
  getConnectedApps: async () => {
    return axios
      .get(`${API_BASE_URL}/apps/connected`)
      .then((response) => response.data);
  },
  connectAppToUser: async (appId: any) => {
    return axios
      .post(`${API_BASE_URL}/apps/connect`, { appId })
      .then((response) => response.data)
      .catch((e) => {
        return {
          error: getErrorMessage(e)
        }
      });
  },
  getCategoryById: async (id: string) => {
    return axios.get(`${API_BASE_URL}/apps/categories/${id}`).then((response) => response.data).catch(e => ({error: getErrorMessage(e)}))
  },
  getAppActivityByAppId: async (appId: string) => {
    return axios.get(`${API_BASE_URL}/apps/activity/${appId}`).then((response) => response.data).catch(e => ({error: getErrorMessage(e)}))
  }
};

export default api;
