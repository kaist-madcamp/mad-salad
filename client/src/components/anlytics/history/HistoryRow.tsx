import styled from 'styled-components';
import { priceToString } from '../../../lib/helper';

interface Props {
  id?: number;
  type?: 'INCOME' | 'EXPENDITURE' | 'SEND' | 'RECEIVE';
  accountId?: number;
  content?: string;
  amount?: number;
  createdAt?: string;
  accountName: string;
}

export default function HistoryRow({
  content,
  type,
  amount,
  accountName,
}: Props) {
  return (
    <Row>
      <HistoryCard>
        <Front>
          <Payment>{accountName}</Payment>
          <Content>{content}</Content>
        </Front>
        <Back>
          <Amount isIncome={type === 'INCOME'}>
            {' '}
            {type === 'INCOME' ? '+' : '-'}
            {priceToString(amount!)}
          </Amount>
        </Back>
      </HistoryCard>
    </Row>
  );
}

const Row = styled.div`
  width: 100%;
`;

const HistoryCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.4375rem 1.9375rem;
  height: 5.4375rem;
  width: 100%;
  background: #333;
  border-radius: 1.25rem;
  margin-bottom: 1.0625rem;
  cursor: pointer;
`;

const Front = styled.div`
  display: flex;
  flex-direction: column;
`;

const Payment = styled.div`
  font-weight: 500;
  font-size: 0.8125rem;
  line-height: 1rem;
  color: #979797;
`;

const Content = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin-top: 0.1875rem;
  color: #f0f0f0;
`;

const Back = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled.div<{ isIncome: boolean }>`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${(props) => (props.isIncome ? '#54aafc' : '#ee4337')};
`;
