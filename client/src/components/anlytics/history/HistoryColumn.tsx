import styled from 'styled-components';
import React from 'react';
import { dateWithDay } from '../../../lib/helper';

interface Props {
  children: React.ReactNode;
  createdAt: string;
}

export default function HistoryColumn({ children, createdAt }: Props) {
  if (React.Children.toArray(children).length === 0) return null;

  return (
    <Column>
      <DateIndicator>{dateWithDay(createdAt)}</DateIndicator>
      {children}
    </Column>
  );
}

const Column = styled.div`
  width: 100%;
`;
const DateIndicator = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
  color: #979797;
`;
