import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Axios from '../../lib/defaultClient';
import { ClickedDataType } from '../calendar/CalendarGrid';
import { FetchHistoryData, FetchHistoryOutput } from '../../lib/api/types';

interface Props {
  index: number;
  setHistory: React.Dispatch<React.SetStateAction<ClickedDataType[]>>;
  setMonthData: React.Dispatch<React.SetStateAction<FetchHistoryData[]>>;
  income: string[];
  setIncome: React.Dispatch<React.SetStateAction<string[]>>;
  outcome: string[];
  setOutcome: React.Dispatch<React.SetStateAction<string[]>>;
}

const GetMonthHistory = ({
  index,
  setHistory,
  setMonthData,
  income,
  setIncome,
  outcome,
  setOutcome,
}: Props) => {
  const { data } = useQuery('monthData', async () => {
    try {
      const { data } = await Axios.get<FetchHistoryOutput>(
        `/transaction/history?year=2021&month=${index + 1}`,
      );
      if (!data.ok) {
        alert(data.error);
      }
      return data.data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  });

  let year = 0;
  let month = 0;
  let day = 0;
  let hour = 0;
  let min = 0;

  useEffect(() => {
    let tmpList: ClickedDataType[] = [];
    let tmpIncome = 0;
    let tmpOutcome = 0;

    data?.map((el) => {
      let tmpTitle = '';
      if (el.type === 'INCOME') {
        tmpTitle = '+' + el.amount;
        tmpIncome += el.amount;
      } else {
        tmpTitle = '-' + el.amount;
        tmpOutcome += el.amount;
      }

      year = +el.createdAt.slice(0, 4);
      month = +el.createdAt.slice(5, 7) - 1;
      day = +el.createdAt.slice(8, 10);
      hour = +el.createdAt.slice(11, 13);
      min = +el.createdAt.slice(14, 16);

      tmpList.push({
        title: tmpTitle,
        allDay: false,
        start: new Date(year, month, day, hour, min),
        end: new Date(year, month, day, hour, min),
        index: el.id,
      });
    });

    setMonthData(data!);
    setHistory(tmpList!);

    setIncome([
      ...income.slice(0, +month),
      tmpIncome.toLocaleString('ko-KR'),
      ...income.slice(+month + 1),
    ]);

    setOutcome([
      ...outcome.slice(0, +month),
      tmpOutcome.toLocaleString('ko-KR'),
      ...outcome.slice(+month + 1),
    ]);
  }, [data]);

  return <div></div>;
};
export default GetMonthHistory;
