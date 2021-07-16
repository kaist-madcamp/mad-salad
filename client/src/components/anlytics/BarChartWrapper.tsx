import styled, { keyframes } from 'styled-components';

interface Props {}

export default function BarChartWrapper(props: Props) {
  return (
    <Container>
      <Row>
        <Column className="name">쇼핑/뷰티</Column>
        <Column className="percent">98.36%</Column>
        <Column className="bar">
          <Bar />
        </Column>
        <Column className="amount">3,000,000</Column>
      </Row>
      <Row>
        <Column className="name">교통</Column>
        <Column className="percent">23.61%</Column>
        <Column className="bar">
          <Bar />
        </Column>
        <Column className="amount">12,500</Column>
      </Row>
      <Row>
        <Column className="name">생활</Column>
        <Column className="percent">22.58%</Column>
        <Column className="bar">
          <Bar />
        </Column>
        <Column className="amount">12,000</Column>
      </Row>
      <Row>
        <Column className="name">생활</Column>
        <Column className="percent">22.58%</Column>
        <Column className="bar">
          <Bar />
        </Column>
        <Column className="amount">12,000</Column>
      </Row>
      <Row>
        <Column className="name">생활</Column>
        <Column className="percent">22.58%</Column>
        <Column className="bar">
          <Bar />
        </Column>
        <Column className="amount">12,000</Column>
      </Row>
    </Container>
  );

}

const slide = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
`;

const Bar = styled.div`
  background-color: #ff5959;
  width: 100%;
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
