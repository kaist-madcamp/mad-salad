import { useState } from 'react';
import styled from 'styled-components';
import MonthSelectorWrapper from '../components/anlytics/MonthSelectorWrapper';
import PageTitle from '../components/PageTitle';
import CategoryChart from '../components/anlytics/chart/CategoryChart';
import DateChart from '../components/anlytics/chart/DateChart';
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
      <PageTitle title="Analytics" />

      <MonthSelectorWrapper
        monthDate={selectedDate.month}
        onClicked={MonthIndicatorClickedHandler}
      />

      {/* Option Navigator  */}
      <Wrapper>
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
            <CategoryChart selectedDate={selectedDate!} />
          </CategorySection>
        ) : (
          <DateChart selectedDate={selectedDate!} />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  margin: 70px 0px 0px;
`;

const Wrapper = styled.div`
  width: calc(100% - 1.875rem);
  max-width: 36.75rem;
  margin: 30px auto;
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
    props.checked ? props.theme.selectedColor : props.theme.unselectedColor};
  background-color: ${(props) =>
    props.checked
      ? props.theme.selectedBgColor
      : props.theme.unselectedBgColor};
  transition: background-color 0.2s ease, color 0.2s ease;
`;

const CategorySection = styled.section`
  margin: 1.5rem 0;
`;
