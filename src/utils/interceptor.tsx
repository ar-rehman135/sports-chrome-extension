import axios from "axios";
import decode from "jwt-decode";
import { API_BASE_URL } from "../constants/api";

export const InitAxiosInterceptor = (context: any) => {
  axios.interceptors.request.use(
    (config) => {
      const [state] = context;

      const accessToken = state && state.token ? state.token : "";

      if (config && config.headers && accessToken) {
        if (config.url?.includes(API_BASE_URL)) {
          config.headers["Authorization"] = "Bearer " + accessToken;
        }
        
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
};
