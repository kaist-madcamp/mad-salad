import React from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';

interface Props {
  accountId: number;
  setSend: React.Dispatch<React.SetStateAction<boolean>>;
  amount: string;
  label: string;
  receiver: string;
  category: string;
  date: string;
  setOpenTransfer: React.Dispatch<React.SetStateAction<boolean>>;
  setCardListClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Send = ({
  accountId,
  setSend,
  amount,
  label,
  receiver,
  category,
  date,
  setOpenTransfer,
  setCardListClicked,
}: Props) => {
  useQuery('send', async () => {
    const response = await Axios.post(`/transaction/send/${accountId}`, {
      amount: amount,
      categoryName: category,
      accountSubId: receiver,
      content: label,
      date: date,
    });

    if (!response.data.ok) {
      alert('Out of balance!');
    }
    return response;
  });

  setSend(false);
  setOpenTransfer(false);
  // setCardListClicked(false);
  return <div></div>;
};

export default Send;
