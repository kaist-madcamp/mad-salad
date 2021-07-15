import * as React from 'react';
import styled from 'styled-components';

const SSeparator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0px 30px;
    width: 100%;
    div {
        width: 100%;
        height: 1px;
        background-color: ${props => props.theme.borderColor};
    }
    span {
        margin: 0 10px;
        font-weight: 600;
        font-size: 12px;
        color: #8e8e8e;
        word-break: keep-all;
    }
`;

export default function Separator () {
  return (
    <SSeparator>
      <div></div>
      <span>또는</span>
      <div></div>
    </SSeparator>
  );
}
