import styled from 'styled-components';

interface Props {}

export default function SumIndicatorWrapper(props: Props) {
  return (
    <Container>
      <SumIndicator>
        <MoneyButtonIncome> +0 </MoneyButtonIncome>
        <MoneyButtonExpenditure> -0 </MoneyButtonExpenditure>
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

const MoneyButtonIncome = styled(MoneyButton)`
  margin-right: 0.9375rem;
  border: 0.125rem solid blue;
  color: blue;
`;

const MoneyButtonExpenditure = styled(MoneyButton)`
  border: 0.125rem solid red;
  color: red;
`;
