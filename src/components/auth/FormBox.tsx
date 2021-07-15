import React from 'react';
import styled from 'styled-components';
import { BaseBox } from '../shared';

interface Props {
  children: React.ReactNode;
}

const SFormBox = styled(BaseBox)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 40px 25px 40px;
  margin: 0 0 10px;
  background-color: ${props => props.theme.bgColor};
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 22px 0px 12px;
    width: 100%;
  }
  h1 {
    font-size: 42px;
    font-weight: 800;
    font-family: cursive;
    margin: 10px 0px 30px;
  }
  h2 {
    color: #8e8e8e;
    font-weight: 600;
    font-size: 17px;
    text-align: center;
    margin-bottom: 10px;
  }
`;

export default function FormBox({ children }: Props) {
  return <SFormBox>{children}</SFormBox>;
}
