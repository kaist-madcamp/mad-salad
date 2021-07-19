import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { GetAllAccountData } from '../../../lib/api/types';
import { getPaymentEnKeyName } from '../../../lib/helper';

interface Props {
  pickedCard: string;
  onClicked: (e: React.MouseEvent<HTMLDivElement>) => void;
  allCardData: GetAllAccountData[];
}

export default function HistoryCardContainer({
  pickedCard,
  onClicked,
  allCardData,
}: Props) {
  if (!allCardData) return <p>등록한 카드가 없습니다.</p>;
  return (
    <CardContainer>
      {allCardData?.map((card, idx) => {
        const EnKey = getPaymentEnKeyName(card.name);
        return (
          <Card
            key={card.id}
            className={`card ${EnKey} ${pickedCard === EnKey && 'selected'}`}
            id={`payment-${idx + 1}`}
            onClick={onClicked}
          >
            <FontAwesomeIcon
              size="2x"
              color={'rgb(51, 51, 51)'}
              icon={faCheckCircle}
            />
          </Card>
        );
      })}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: auto;
  flex: none;
  scroll-snap-type: x mandatory;
  padding-left: 145px;
  padding-right: 170px;
  padding-bottom: 14px;
  &::-webkit-scrollbar {
    display: none;
  }
  .card {
    flex: none;
    margin-right: 32px;
    scroll-snap-align: center;
    cursor: pointer;
  }
  .card svg {
    display: none;
    font-size: 41px;
    position: absolute;
    right: 18px;
    bottom: 18px;
  }
  .card.selected svg {
    display: block;
  }
`;

const Card = styled.div``;
