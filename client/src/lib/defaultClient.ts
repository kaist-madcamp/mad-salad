import axios, { AxiosInstance } from 'axios';
import { TOKEN } from '../hooks/useLogin';

const token = localStorage.getItem(TOKEN);

const Axios: AxiosInstance = axios.create({
  baseURL: 'https://back.xircle.org',
  headers: {
    token: token,
  },
});

export default Axios;
