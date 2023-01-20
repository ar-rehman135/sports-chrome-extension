import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, REQUEST_HEADERS } from '../constants/api';
import { IRequestBody } from './service.types';

export const postRequest = (url: string, body?: IRequestBody) => {
  return axios.post(url, body, { headers: REQUEST_HEADERS });
};

export const getRequest = (url: string, token?: string, config?: AxiosRequestConfig) => {
    if (token) {
    return axios.get(API_BASE_URL + url, {
      ...config,
      headers: {
        ...REQUEST_HEADERS,
        ...config?.headers,
        Authorization: token,
      },
    });
  } else {
    return axios.get(url, { headers: REQUEST_HEADERS });
  }
};

export const getErrorMessage = (json: AxiosError) => {
    return json?.response?.data?.message
      ? json?.response?.data?.message
      : json?.response?.data?.errors.length
      ? json?.response?.data?.errors
      : "Error while processing your request";
  };