import { useState } from 'react';
import styled from 'styled-components';
import MonthSelectorWrapper from '../components/anlytics/MonthSelectorWrapper';
import SumIndicatorWrapper from '../components/anlytics/SumIndicatorWrapper';
import { FetchHistoryData, FetchHistoryInput } from '../lib/api/types';
import HistoryViewWrapper from '../components/anlytics/HistoryViewWrapper';
import { useQuery } from 'react-query';
import { fetchHistoryAPI } from '../lib/api/history';

interface Props {}

export enum SumIndicatorType {
  DEFAULT = 'DEFAULT',
  INCOME = 'INCOME',
  EXPENDITURE = 'EXPENDITURE',
}

export default function HistoryView(props: Props) {
  const [selectedDate, setSelectedDate] = useState<FetchHistoryInput>({
    year: 2021,
    month: 7,
  });        
  const [
    selectedSumIndicator,
    setSelectedSumIndicator,
  ] = useState<SumIndicatorType>(SumIndicatorType.DEFAULT);

  const { data: historyData, isLoading, error } = useQuery<
    FetchHistoryData[] | undefined
  >(['history', selectedDate], () => fetchHistoryAPI(selectedDate), {
    retry: 1,
  });

  const MonthIndicatorClickedHandler = (data: FetchHistoryInput) => {
    setSelectedDate(data);
  };

  const SumIndicatorClickedHandler = (data: SumIndicatorType) => {
    setSelectedSumIndicator(data);
  };

  return (
    <div>
      <MonthSelectorWrapper onClicked={MonthIndicatorClickedHandler} />
      <SumIndicatorWrapper
        SumIndicatorClickedHandler={SumIndicatorClickedHandler}
        selectedSumIndicator={selectedSumIndicator}
        historyData={historyData!}
      />
      <HistoryViewWrapper />
    </div>
  );
}
