import styled from 'styled-components';
import { FetchHistoryInput } from '../../lib/api/history';

interface Props {
  onClicked: (data: FetchHistoryInput) => void;
}

export default function MonthSelectorWrapper({ onClicked }: Props) {
  return (
    <Container>
      <MonthSelector>
        <MonthIndicator onClick={() => onClicked({ year: 2021, month: 6 })}>
          <Year>2021</Year>
          <Month>Jun</Month>
        </MonthIndicator>
        <MonthIndicator onClick={() => onClicked({ year: 2021, month: 7 })}>
          <Year>2021</Year>
          <Month>Jul</Month>
        </MonthIndicator>
        <MonthIndicator onClick={() => onClicked({ year: 2021, month: 8 })}>
          <Year>2021</Year>
          <Month>Aug</Month>
        </MonthIndicator>
      </MonthSelector>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  max-width: 75rem;
  overflow-x: hidden;
  margin: 3rem auto;
  position: relative;
`;

const MonthSelector = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MonthIndicator = styled.div`
  width: 100%;
  --webkit-box-flex: 1;
  flex: 1;
  cursor: pointer;
`;

const Year = styled.div`
  color: gray;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
`;

const Month = styled.div`
  color: ${(props) => props.theme.color};
  margin-top: 0.125rem;
  font-weight: 700;
  font-size: 3.125rem;
  line-height: 3.8125rem;
  text-align: center;
`;
