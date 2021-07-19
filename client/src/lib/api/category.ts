import Axios from '../defaultClient';
import { GetAllCategoriesData, GetAllCategoriesOutput } from './types';

export const getAllCategories = async (): Promise<
  GetAllCategoriesData[] | undefined
> => {
  const { data } = await Axios.get<GetAllCategoriesOutput>(
    '/category/getAllCategories',
  );
  if (!data.ok) {
    console.log(data.error);
  }
  console.log(data.data);
  return data.data;
};
