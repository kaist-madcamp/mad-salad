import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';
import {
  GetAllAccountOutput,
  GetAllCategoriesData,
  GetAllCategoriesOutput,
} from '../../lib/api/types';

interface Props {
  setIncomeCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  setOutcomeCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  setGetAllCategoriesData: React.Dispatch<
    React.SetStateAction<GetAllCategoriesData[]>
  >;
}
const GetAllCategories = ({
  setIncomeCategoryList,
  setOutcomeCategoryList,
  setCategoryList,
  setGetAllCategoriesData,
}: Props) => {
  //incomeCategories 가져오기
  const { data } = useQuery<GetAllCategoriesData[]>(
    'GetAllCategories',
    async () => {
      const { data } = await Axios.get<GetAllCategoriesOutput>(
        '/category/getAllCategories',
      );
      if (!data.ok) alert(data.error);
      return data.data;
    },
  );

  const tmpIncome: string[] = [];
  const tmpOutcome: string[] = [];

  data?.map((el) => {
    if (el.type === 'EXPENDITURE') {
      tmpOutcome.push(el.name);
    } else {
      tmpIncome.push(el.name);
    }
  });

  useEffect(() => {
    setIncomeCategoryList(tmpIncome!);
    setCategoryList(tmpIncome);
    setGetAllCategoriesData(data!);
    setOutcomeCategoryList(tmpOutcome);
  }, [data]);

  return <div></div>;
};

export default GetAllCategories;
