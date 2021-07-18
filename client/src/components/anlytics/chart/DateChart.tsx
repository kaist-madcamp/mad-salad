import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { fetchHistoryAPI } from '../../../lib/api/history';
import { Notification } from './CategoryChart';
import { FetchHistoryData } from '../../../lib/api/types';

interface Props {
  selectedDate: { year: number; month: number };
}

const DateChart = ({ selectedDate }: Props) => {
  const { data: historyData, isLoading, error } = useQuery<
    FetchHistoryData[] | undefined
  >(['history', selectedDate], () => fetchHistoryAPI(selectedDate), {
    retry: 1,
  });

  const dailyArray = [
    ...Array(new Date(selectedDate.year, selectedDate.month, 0).getDate()),
  ].map((_, i) => i + 1);

  const zeroArr = new Array(dailyArray?.length).fill(0);

  historyData?.map((el) => {
    if (el.type === 'INCOME' || el.type === 'RECEIVE') return;
    const idx = new Date(el.createdAt).getDate() - 1;
    zeroArr[idx] += el.amount;
  });

  const datas = {
    labels: dailyArray,
    datasets: [
      {
        label: '이번달 지출',
        data: zeroArr,
        borderWidth: 2,
        radius: 8,
        borderColor: 'rgb(0, 145, 250)',
        backgroundColor: 'rgb(0, 145, 250)',
        pointBorderColor: '#fff',
      },
    ],
  };

  if (!historyData || historyData?.length === 0)
    return <Notification>No expenditures this month</Notification>;

  if (isLoading) return <Notification>Loading...</Notification>;
  if (error) return <Notification>Error..</Notification>;
  return (
    <Container>
      <Line type={'line'} height={180} data={datas} options={options} />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 0 10rem;
`;

export default DateChart;

const options: Chart.ChartOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  tooltips: {
    titleFontColor: '#fff',
    titleMarginBottom: 30,
  },
};
