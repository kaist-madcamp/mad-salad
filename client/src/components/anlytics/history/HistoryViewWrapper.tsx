import React from 'react';
import styled from 'styled-components';
import {
  FetchHistoryByCreatedAtData,
  FetchHistoryData,
} from '../../../lib/api/types';
import { SumIndicatorType } from '../../../pages/HistoryView';
import HistoryColumn from './HistoryColumn';
import HistoryRow from './HistoryRow';

interface Props {
  historyDataByCreatedAt: FetchHistoryByCreatedAtData[][];
  selectedSumIndicator: SumIndicatorType;
}

export default function HistoryViewWrapper({
  historyDataByCreatedAt,
  selectedSumIndicator,
}: Props) {
  console.log(historyDataByCreatedAt);

  if (!historyDataByCreatedAt) return null;
  return (
    <Container>
      {historyDataByCreatedAt.map((rows, idx) => (
        <HistoryColumn key={idx}>
          {rows.map((row) => (
            <HistoryRow
              key={row.id}
              type={row.type}
              content={row.content}
              amount={row.amount}
              accountName={row.account.name}
            />
          ))}
        </HistoryColumn>
      ))}
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 7.5rem;
  width: calc(100% - 1.875rem);
  max-width: 36.75rem;
  margin: 5.0625rem auto 0;
`;
