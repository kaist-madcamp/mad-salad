import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FetchHistoryData } from '../../lib/api/types';
import { priceToString } from '../../lib/helper';
import { SumIndicatorType } from '../../pages/HistoryView';

interface Props {
  historyData: FetchHistoryData[];
  selectedSumIndicator: SumIndicatorType;
  SumIndicatorClickedHandler: (data: SumIndicatorType) => void;
}

interface MoneyType {
  income: number;
  expenditure: number;
}

export default function SumIndicatorWrapper({
  historyData,
  selectedSumIndicator,
  SumIndicatorClickedHandler,
}: Props) {
  const [totalMoney, setTotalMoney] = useState<MoneyType>({
    income: 0,
    expenditure: 0,
  });

  useEffect(() => {
    let income = 0;
    let expenditure = 0;
    historyData?.map((el) => {
      if (el.type === 'INCOME' || el.type === 'RECEIVE') income += el.amount;
      else expenditure += el.amount;
    });
    setTotalMoney({
      income,
      expenditure,
    });
  }, [historyData]);

  return (
    <Container>
      <SumIndicator>
        <MoneyButtonIncome
          active={selectedSumIndicator === 'INCOME'}
          onClick={() =>
            selectedSumIndicator === 'INCOME'
              ? SumIndicatorClickedHandler(SumIndicatorType.DEFAULT)
              : SumIndicatorClickedHandler(SumIndicatorType.INCOME)
          }
        >
          {' '}
          +{priceToString(totalMoney.income)}{' '}
        </MoneyButtonIncome>
        <MoneyButtonExpenditure
          active={selectedSumIndicator === 'EXPENDITURE'}
          onClick={() =>
            selectedSumIndicator === 'EXPENDITURE'
              ? SumIndicatorClickedHandler(SumIndicatorType.DEFAULT)
              : SumIndicatorClickedHandler(SumIndicatorType.EXPENDITURE)
          }
        >
          -{priceToString(totalMoney.expenditure)}
        </MoneyButtonExpenditure>
      </SumIndicator>
    </Container>
  );
}

const Container = styled.div`
  margin: 3.375rem auto;
  width: calc(100% - 1.875rem);
  max-width: 36.75rem;
`;

const SumIndicator = styled.div`
  display: flex;
`;

const MoneyButton = styled.div`
  --webkit-box-flex: 1;
  flex: auto;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 0.9375rem;
  height: 3.5rem;
  line-height: 1.875rem;
  font-size: 1.5625rem;
  text-align: center;
  font-weight: 700;
  font-feature-settings: 'tnum' on, 'lnum' on;
  transition: background 0.2s ease;
  cursor: pointer;
`;

const MoneyButtonIncome = styled(MoneyButton)<{ active: boolean }>`
  margin-right: 0.9375rem;
  border: 0.1rem solid #54aafc;
  color: ${(props) => (props.active ? '#fff' : '#54aafc')};
  background-color: ${(props) => (props.active ? '#54aafc' : 'transparent')};
`;

const MoneyButtonExpenditure = styled(MoneyButton)<{ active: boolean }>`
  border: 0.1rem solid #ee4337;
  color: ${(props) => (props.active ? '#fff' : '#ee4337')};
  background-color: ${(props) =>
    props.active ? 'rgb(238, 67, 55)' : 'transparent'};
`;
