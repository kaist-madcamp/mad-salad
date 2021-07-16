import Axios from '../defaultClient';
import { CoreOutput } from '../CoreOutput';

export interface FetchHistoryInput {
  year: number;
  month: number;
}
interface FetchHistoryOutput extends CoreOutput {
  data: any[];
}

export const fetchHistoryAPI = async (fetchHistoryInput: FetchHistoryInput) => {
  const { data } = await Axios.get<FetchHistoryOutput>(
    `/history?year=${fetchHistoryInput.year}&month=${fetchHistoryInput.month}`,
  );
  if (!data.ok) {
    alert(data.error);
  }
  return data.data;
};
