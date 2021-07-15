import Axios from '../defaultClient';

export type JoinInput = {
  email: string;
  name: string;
  password: string;
};

// export const userJoinFetcher = (joinInput: JoinInput) => {
//   return Axios.post('/user', joinInput);
// };

export const sendEmail = (email: string) => {
  return Axios.post('/email', { email });
};

export const checkEmail = (email: string, code: number) => {
  return Axios.post('/check/email', { email, code });
};
export const findInfo = (email: string) => {
  return Axios.post('/find/info', { email });
};

export const checkName = (displayName: string) => {
  return Axios.post('/check/name', { displayName });
};
export const login = (displayName: string, password: string) => {
  return Axios.post('/check/name', { displayName, password });
};
