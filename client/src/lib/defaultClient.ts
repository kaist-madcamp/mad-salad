import axios, { AxiosInstance } from 'axios';

const token = localStorage.getItem('tk');

const Axios: AxiosInstance = axios.create({
  baseURL: 'https://back.xircle.org',
  headers: {
    token: token,
  },
});

export default Axios;
