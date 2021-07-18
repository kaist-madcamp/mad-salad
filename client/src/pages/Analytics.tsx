import styled from 'styled-components';
import MonthSelectorWrapper from '../components/anlytics/MonthSelectorWrapper';
import PageTitle from '../components/PageTitle';
import CategoryChart from '../components/anlytics/CategoryChart';
import { useState } from 'react';
import DateChart from '../components/anlytics/DateChart';
import { FetchHistoryInput } from '../lib/api/types';

export default function Analytics() {
  const [AnalyticsOption, setAnalyticsOption] = useState<string>('category');
  const [selectedDate, setSelectedDate] = useState<FetchHistoryInput>({
    year: 2021,
    month: 7,
  });

  const MonthIndicatorClickedHandler = (data: FetchHistoryInput) => {
    setSelectedDate(data);
  };

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
            <CategoryChart selectedDate={selectedDate} />
          </CategorySection>
        ) : (
          <DateChart selectedDate={selectedDate} />
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
  margin-bottom: 3rem;
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
  margin: 1.5rem 0 3rem;
  padding-bottom: 7.5rem;
`;
