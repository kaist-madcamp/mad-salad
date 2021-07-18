import axios, { AxiosInstance } from 'axios';
import { TOKEN } from '../hooks/useLogin';

const token = localStorage.getItem(TOKEN);

const Axios: AxiosInstance = axios.create({
  baseURL: 'http://172.10.18.176',
  headers: {
    authorization: token,
  },
});

export default Axios;
