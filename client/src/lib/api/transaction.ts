import Axios, { source } from '../defaultClient';
import { CoreOutput } from '../CoreOutput';
import { AxiosResponse } from 'axios';
import {
  CreateTransactionInput,
  GetPendingTransactionData,
  GetPendingTransactionOutput,
  ReceivePendingTransactionInput,
  UpdateTransactionInput,
} from './types.d';

export const createTransaction = async (
  createTransactionInput: CreateTransactionInput,
): Promise<AxiosResponse<CoreOutput>> => {
  return Axios.post(
    `/transaction/${createTransactionInput.type}/${createTransactionInput.accountId}`,
    {
      ...createTransactionInput,
    },
  );
};

export const updateTransaction = async (
  updateTransactionInput: UpdateTransactionInput,
): Promise<AxiosResponse<CoreOutput>> => {
  return Axios.put<CoreOutput>('/transaction/updateOne', {
    ...updateTransactionInput,
    type: updateTransactionInput.type.toUpperCase(),
  });
};

export const deleteTransaction = async (
  transactionId: number,
): Promise<AxiosResponse<CoreOutput>> => {
  return Axios.post<CoreOutput>(`/transaction/deleteOne`, {
    transactionId,
  });
};

export const getPendingTransactionAPI = async (): Promise<
  GetPendingTransactionData | undefined
> => {
  const { data } = await Axios.get<GetPendingTransactionOutput>(
    '/transaction/getPending',
    {
      cancelToken: source.token,
    },
  );

  if (!data.ok) {
    alert(data.error);
  }
  return data.data;
};

export const ReceivePendingTransactionAPI = async (
  receivePendingTransactionInput: ReceivePendingTransactionInput,
): Promise<AxiosResponse<CoreOutput>> => {
  return Axios.post('/transaction/receive', {
    ...receivePendingTransactionInput,
  });
};
