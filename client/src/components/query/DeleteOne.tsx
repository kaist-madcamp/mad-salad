import React from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';
import { ClickedDataType } from '../calendar/CalendarGrid';

export interface Props {
  clickedData: ClickedDataType;
  setSendDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
// 약간 수정함
const DeleteOne = ({ clickedData, setSendDelete, setOpenModal }: Props) => {
  useQuery('deleteOne', async () => {
    await Axios.post('/transaction/deleteOne', {
      transactionId: clickedData.index,
    });
  });

  setSendDelete(false);
  setOpenModal(false);
  return <div></div>;
};

export default DeleteOne;
