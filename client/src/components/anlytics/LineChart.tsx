import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

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
};

const LineChart = () => (
  <Container>
    <Line type={'line'} data={data} options={options} />
  </Container>
);

const Container = styled.div`
  margin: 0 0 10rem;
`;

export default LineChart;
