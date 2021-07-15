import Axios from '../defaultClient';

interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

export const createUserAPI = async (createUserInput: CreateUserInput) => {
  const response = await Axios.post('/user/join', {
    ...createUserInput,
  });
  console.log(response);
  return response;
};

export const loginUserAPI = async (loginUserInput: LoginUserInput) => {
  const response = await Axios.post('/user/login', {
    ...loginUserInput,
  });
  console.log(response);
  return response;
};
