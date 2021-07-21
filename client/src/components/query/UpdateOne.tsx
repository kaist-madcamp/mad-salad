import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';
import { ClickedDataType } from '../calendar/CalendarGrid';

interface Props {
  clickedData: ClickedDataType;
  label: string;
  amount: string;
  categoryName: string;
  date: string;
  accountId: number;
  setSendEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateOne = ({
  clickedData,
  label,
  amount,
  categoryName,
  date,
  accountId,
  setSendEdit,
  setOpenModal,
}: Props) => {
  const { error, data } = useQuery('updateOne', async () => {
    let tmpType = 'INCOME';
    if (clickedData.title.slice(0, 1) === '-') {
      tmpType = 'EXPENDITURE';
    }

    return Axios.put('transaction/updateOne', {
      transactionId: clickedData.index,
      content: label,
      amount: amount,
      categoryName: categoryName,
      type: tmpType,
      createdAt: date,
      accountId: accountId,
    });
  });

  if (error) {
    console.log('error');
  }

  useEffect(() => {
    setSendEdit(false);
    setOpenModal(false);
  }, [data]);

  return <div></div>;
};

export default UpdateOne;
