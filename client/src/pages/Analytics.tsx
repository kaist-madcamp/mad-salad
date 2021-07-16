import { useMutation, useQuery } from 'react-query';
import styled from 'styled-components';
import MonthSelectorWrapper from '../components/anlytics/MonthSelectorWrapper';
import PolarChartWrapper from '../components/anlytics/PolarChartWrapper';
import PageTitle from '../components/PageTitle';
import BarChartWrapper from '../components/anlytics/BarChartWrapper';
import { useState } from 'react';
import LineChart from '../components/anlytics/LineChart';
import { fetchHistoryAPI, FetchHistoryInput } from '../lib/api/history';

const data = [
  {
    id: 57,
    userId: 1,
    categoryId: 6,
    paymentId: 2,
    type: 'expenditure',
    amount: 3,
    content: 'ㅇㄹ',
    date: '2021-07-15T15:00:00.000Z',
    isDeleted: 0,
    createdAt: '2021-07-16T10:57:42.000Z',
    updatedAt: '2021-07-16T10:57:42.000Z',
  },
  {
    id: 58,
    userId: 1,
    categoryId: 6,
    paymentId: 1,
    type: 'expenditure',
    amount: 1650000,
    content: 'trt',
    date: '2021-07-15T15:00:00.000Z',
    isDeleted: 0,
    createdAt: '2021-07-16T11:37:24.000Z',
    updatedAt: '2021-07-16T11:37:24.000Z',
  },
];

export default function Analytics() {
  const [AnalyticsOption, setAnalyticsOption] = useState<string>('category');
  const [selectedDate, setSelectedDate] = useState<FetchHistoryInput>({
    year: 2021,
    month: 7,
  });

  // const { data, isLoading, error } = useQuery(['history', selectedDate], () =>
  //   fetchHistoryAPI(selectedDate),
  // );

  const MonthIndicatorClickedHandler = (data: FetchHistoryInput) => {
    setSelectedDate(data);
  };

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error..</p>;

  return (
    <Container>
      <Wrapper>
        <PageTitle title="Analytics" />

        <MonthSelectorWrapper onClicked={MonthIndicatorClickedHandler} />

        {/* Option Navigator  */}
        <AnalyticsOptions>
          <AnalyticsOptionBtn
            onClick={() => setAnalyticsOption('category')}
            checked={AnalyticsOption === 'category' ? true : false}
          >
            By Categories
          </AnalyticsOptionBtn>
          <AnalyticsOptionBtn
            onClick={() => setAnalyticsOption('date')}
            checked={AnalyticsOption === 'date' ? true : false}
          >
            By Dates
          </AnalyticsOptionBtn>
        </AnalyticsOptions>

        {/* Chart Container */}
        {AnalyticsOption === 'category' ? (
          <CategorySection>
            <PolarChartWrapper data={data} />
            <BarChartWrapper data={data} />
          </CategorySection>
        ) : (
          <LineChart data={data} />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  width: calc(100% - 1.875rem);
  max-width: 36.75rem;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

const AnalyticsOptions = styled.div`
  width: 100%;
  justify-content: center;
  margin-bottom: 5rem;
  border-radius: 0.625rem;
  overflow: hidden;
`;

const button = styled.button`
  margin: 0;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  font-family: inherit;
`;

const AnalyticsOptionBtn = styled(button)<{ checked: boolean }>`
  flex: 1;
  width: 50%;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 0.8125rem;
  color: ${(props) =>
    props.checked ? props.theme.checkedColor : props.theme.color};
  background-color: ${(props) =>
    props.checked ? props.theme.checkedBgColor : props.theme.uncheckedBgColor};
  transition: background-color 0.2s ease, color 0.2s ease;
`;

const CategorySection = styled.section`
  margin: 3rem 0;
  padding-bottom: 7.5rem;
`;
