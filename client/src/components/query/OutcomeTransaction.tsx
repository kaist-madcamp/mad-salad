import React from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';

interface Props {
  accountId: number;
  categoryId: number;
  amount: string;
  label: string;
  date: string;
  setSendOutcome: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const OutcomeTransaction = ({
  accountId,
  amount,
  categoryId,
  label,
  date,
  setSendOutcome,
  closeModal,
}: Props) => {
  const { error } = useQuery('sendOutcome', async () => {
    const response = await Axios.post(`/transaction/expenditure/${accountId}`, {
      amount: amount,
      categoryId: categoryId,
      content: label,
      date: date,
    });
    if (response.data.ok === false) {
      alert('Out of balance!');
    }
    return response;
  });

  if (error) {
    console.log('error');
  }

  setSendOutcome(false);
  closeModal(false);

  return <div></div>;
};

export default OutcomeTransaction;
