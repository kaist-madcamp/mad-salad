import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';
import { GetAllAccountData } from '../../lib/api/types.d';

interface Props {
  setAccountList: React.Dispatch<React.SetStateAction<string[]>>;
  setGetAllAccountData: React.Dispatch<
    React.SetStateAction<GetAllAccountData[]>
  >;
}

const GetAllAccount = ({ setAccountList, setGetAllAccountData }: Props) => {
  let tmpList: string[] = [];
  const { data } = useQuery<GetAllAccountData[] | undefined>(
    'GetAllAccount',
    async () => {
      const response = await Axios.get('/acct/getall');
      return response.data.data;
    },
  );

  data?.map((el) => {
    tmpList.push(el.name);
  });

  useEffect(() => {
    setAccountList(tmpList);
    setGetAllAccountData(data!);
  }, [data]);

  return <div></div>;
};

export default GetAllAccount;
