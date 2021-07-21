import styled from 'styled-components';

export const PaymentManagerCardWrapper = styled.div`
  margin-top: 25px;
  margin-right: -25px;
  transition: transform 300ms ease;
  position: relative;
  cursor: pointer;
  &:hover {
    transform: translateX(-50px);
  }
`;

export const PaymentManagerCard = styled.div`
  transform: translateX(0);
  transition: transform 300ms ease;
  will-change: transform;
`;
