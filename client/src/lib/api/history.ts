import Axios from '../defaultClient';
import {
  FetchHistoryData,
  FetchHistoryInput,
  FetchHistoryOutput,
  FetchHistoryByCategoryData,
  FetchHistoryByCategoryOutput,
} from './types';

export const fetchHistoryAPI = async (
  fetchHistoryInput: FetchHistoryInput,
): Promise<FetchHistoryData[] | undefined> => {
  const { data } = await Axios.get<FetchHistoryOutput>(
    `/transaction/history?year=${fetchHistoryInput.year}&month=${fetchHistoryInput.month}`,
  );
  if (!data.ok) alert(data.error);
  console.log(data.data);
  return data.data;
};

export const fetchHistoryByCategoryAPI = async (
  fetchHistoryInput: FetchHistoryInput,
): Promise<FetchHistoryByCategoryData[] | undefined> => {
  const { data } = await Axios.get<FetchHistoryByCategoryOutput>(
    `/transaction/historyByCategory?year=${fetchHistoryInput.year}&month=${fetchHistoryInput.month}`,
  );
  if (!data.ok) alert(data.error);
  console.log(data.data);
  return data.data;
};
