import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { TOKEN } from './constants';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://mad-salad.herokuapp.com',
  headers: {
    Authorization: localStorage.getItem(TOKEN),
  },
  timeout: 8000,
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.url === '/auth/login' || config.url === '/user/join')
    return config;
  if (!config.headers.Authorization) {
    source.cancel('Request cancelled, Because token is null');
    window.location.reload();
  }
  return config;
});

export default axiosInstance;
