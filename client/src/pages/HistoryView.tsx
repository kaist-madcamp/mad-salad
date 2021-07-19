import { useState } from 'react';
import MonthSelectorWrapper from '../components/anlytics/MonthSelectorWrapper';
import SumIndicatorWrapper from '../components/anlytics/SumIndicatorWrapper';
import {
  FetchHistoryByCreatedAtData,
  FetchHistoryData,
  FetchHistoryInput,
} from '../lib/api/types';
import HistoryViewWrapper from '../components/anlytics/history/HistoryViewWrapper';
import { useQuery } from 'react-query';
import {
  fetchHistoryAPI,
  fetchHistoryByCreatedAtAPI,
} from '../lib/api/history';
import { Notification } from '../components/anlytics/chart/CategoryChart';

export enum SumIndicatorType {
  DEFAULT = 'DEFAULT',
  INCOME = 'INCOME',
  EXPENDITURE = 'EXPENDITURE',
}

export default function HistoryView() {
  const [selectedDate, setSelectedDate] = useState<FetchHistoryInput>({
    year: 2021,
    month: 7,
  });
  const [
    selectedSumIndicator,
    setSelectedSumIndicator,
  ] = useState<SumIndicatorType>(SumIndicatorType.DEFAULT);

  const { data: historyDataByCreatedAt, isLoading, error } = useQuery<
    FetchHistoryByCreatedAtData[][] | undefined
  >(
    ['historyByCreatedAt', selectedDate],
    () => fetchHistoryByCreatedAtAPI(selectedDate),
    {
      retry: 1,
    },
  );

  const { data: historyData } = useQuery<FetchHistoryData[] | undefined>(
    ['history', selectedDate],
    () => fetchHistoryAPI(selectedDate),
    {
      retry: 1,
    },
  );

  const MonthIndicatorClickedHandler = (data: FetchHistoryInput) => {
    setSelectedDate(data);
  };

  const SumIndicatorClickedHandler = (data: SumIndicatorType) => {
    setSelectedSumIndicator(data);
  };

  return (
    <>
      <MonthSelectorWrapper onClicked={MonthIndicatorClickedHandler} />
      <SumIndicatorWrapper
        historyData={historyData!}
        selectedSumIndicator={selectedSumIndicator}
        SumIndicatorClickedHandler={SumIndicatorClickedHandler}
      />
      {isLoading && <Notification>Loading...</Notification>}
      {error && <Notification>Error..</Notification>}
      {!historyData ? null : (
        <HistoryViewWrapper
          historyDataByCreatedAt={historyDataByCreatedAt!}
          selectedSumIndicator={selectedSumIndicator}
        />
      )}
    </>
  );
}
