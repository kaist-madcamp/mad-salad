import { fetchHistoryByCategoryAPI } from '../../../lib/api/history';
import styled, { keyframes } from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { priceToString } from '../../../lib/helper';
import {
  FetchHistoryByCategoryData,
  FetchHistoryInput,
} from '../../../lib/api/types';

interface Props {
  selectedDate: FetchHistoryInput;
}

export default function CategoryChart({ selectedDate }: Props) {
  const { data: historyData, isLoading, error } = useQuery<
    FetchHistoryByCategoryData[] | undefined
  >(
    ['historyByCategory', selectedDate],
    () => fetchHistoryByCategoryAPI(selectedDate),
    {
      retry: 1,
    },
  );

  console.log(selectedDate);

  const dataForPie = {
    labels: historyData?.map((el) => el.categoryName),
    datasets: [
      {
        data: historyData?.map((el) => el.amount),
        backgroundColor: historyData?.map((_, idx) => pieBackgroundColor[idx]),
        borderWidth: 0,
      },
    ],
  };

  if (!historyData || historyData.length === 0)
    return <Notification>No expenditures this month</Notification>;
  if (isLoading) return <Notification>Loading...</Notification>;
  if (error) return <Notification>Error..</Notification>;

  const totalSum = historyData?.reduce((acc, el) => acc + el.amount, 0);
  return (
    <>
      <PolarCharWrapper>
        <Pie
          width={300}
          height={300}
          type={'pie'}
          data={dataForPie}
          options={{
            maintainAspectRatio: false,
          }}
        />
      </PolarCharWrapper>
      <Container>
        {historyData.map((el) => {
          console.log(el.amount);
          return (
            <Row key={el.categoryName}>
              <Column className="categoryName">{el.categoryName}</Column>
              <Column className="percent">{`${(
                (el.amount / totalSum) *
                100
              ).toFixed(2)}%`}</Column>
              <Column className="bar">
                <Bar width={`${((el.amount / totalSum) * 100).toFixed(2)}%`} />
              </Column>
              <Column className="amount">{priceToString(el.amount)}</Column>
            </Row>
          );
        })}
      </Container>
    </>
  );
}

export const Notification = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  display: block;
  text-align: center;
  margin-top: 30px;
`;

const slide = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
`;

const Bar = styled.div<{ width: string }>`
  background-color: #ff5959;
  width: ${(props) => props.width};
  height: 24px;
  border-radius: 0.3125rem;
  animation: ${slide} 0.5s ease forwards;
  animation-delay: 0.1s;
  -webkit-animation-delay: 0.1s;
`;

const Container = styled.div`
  margin: 2rem 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background-color: ${(props) => props.theme.itemRowBgColor};
  padding: 1.175rem;
  border-radius: 0.625rem;
  margin-bottom: 0.9375rem;
  .categoryName {
    color: #aaa;
  }
  .name {
    width: 100%;
    max-width: 4.5rem;
    text-align: right;
    font-weight: 500;
    color: ${(props) => props.theme.itemRowColor};
  }
  .percent {
    width: 100%;
    max-width: 4.5em;
    text-align: right;
    margin-left: 0.625rem;
    font-weight: 600;
    font-size: 0.9em;
  }
  .bar {
    width: 100%;
    margin-left: 0.7em;
    min-width: 15em;
    border-radius: 0.3125rem;
    overflow: hidden;
  }
  .amount {
    color: rgb(238, 67, 55);
    width: 100%;
    max-width: 7em;
    font-weight: 600;
  }
  &:nth-child(1) ${Bar} {
    background: #ff5959;
    animation-delay: 100ms;
  }
  &:nth-child(2) ${Bar} {
    background: #f98f54;
    animation-delay: 200ms;
  }
  &:nth-child(3) ${Bar} {
    background: #f0c350;
    animation-delay: 300ms;
  }
  &:nth-child(4) ${Bar} {
    background: #7bca3d;
    animation-delay: 400ms;
  }
  &:nth-child(5) ${Bar} {
    background: #56db9b;
    animation-delay: 500ms;
  }
  &:nth-child(6) ${Bar} {
    background: #2bcfda;
    animation-delay: 600ms;
  }
  &:nth-child(7) ${Bar} {
    background: #5580ef;
    animation-delay: 700ms;
  }
  &:nth-child(8) ${Bar} {
    background: #9979f3;
    animation-delay: 800ms;
  }
  &:nth-child(9) ${Bar} {
    background: #d879f0;
    animation-delay: 900ms;
  }
  &:nth-child(10) ${Bar} {
    background: #ff5fa2;
    animation-delay: 1000ms;
  }
`;

const Column = styled.div`
  width: 100%;
  max-width: 4.5em;
  text-align: right;
  margin-left: 0.625rem;
  font-weight: 600;
  font-size: 0.9em;
  color: #979797;
`;

const PolarCharWrapper = styled.div`
  width: 100%;
  margin: 0 0 3em;
`;

const pieBackgroundColor = [
  '#FF5959',
  '#F98F54',
  '#F0C350',
  '#7BCA3D',
  '#56DB9B',
  '#2BCFDA',
  '#5580EF',
  '#9979F3',
  '#D879F0',
  '#FF5FA2',
];
