import axios, { AxiosInstance } from 'axios';
import { TOKEN } from '../hooks/useLogin';

const token = localStorage.getItem(TOKEN);

const Axios: AxiosInstance = axios.create({
  baseURL: 'https://mad-salad.herokuapp.com',
  headers: {
    authorization: token,
  },
});

export default Axios;
