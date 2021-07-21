import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';

interface Props {
  accountId: number;
  categoryName: string;
  amount: string;
  label: string;
  date: string;
  setSendIncome: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const IncomeTransaction = ({
  accountId,
  amount,
  categoryName,
  label,
  date,
  setSendIncome,
  closeModal,
}: Props) => {
  const { error } = useQuery('sendIncome', async () => {
    const response = await Axios.post(`/transaction/income/${accountId}`, {
      amount: amount,
      categoryName,
      content: label,
      date: date,
    });
    console.log(response);
    return response;
  });

  if (error) {
    console.log('error');
  }
  setSendIncome(false);
  closeModal(false);

  return <div></div>;
};

export default IncomeTransaction;
