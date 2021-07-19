import Axios from '../defaultClient';
import { GetAllAccountData, GetAllAccountOutput } from './types';

export const getAllAccount = async (): Promise<
  GetAllAccountData[] | undefined
> => {
  const { data } = await Axios.get<GetAllAccountOutput>('/acct/getall');
  if (!data.ok) {
    console.log(data.error);
  }
  console.log(data.data);
  return data.data;
};
