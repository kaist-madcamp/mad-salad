import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import './CardSlider.css';

const left = '<';
const right = '>';

const style = {
  animation: 'float 2s ease-in-out infinite',
  border: 'solid black 2px',
  color: 'white',
};

interface Props {
  accountList: any[];
  account: string;
  setAccount: React.Dispatch<React.SetStateAction<string>>;
  accountId: number;
}

const CardSlider = ({ accountList, account, accountId, setAccount }: Props) => {
  const [cardIndex, setCardIndex] = useState(accountId);

  useEffect(() => {
    setCardIndex(accountId);
  }, [accountId]);

  //한 달 전으로 이동
  const changeIndex_minus = () => {
    setCardIndex(cardIndex - 1);
  };

  //한 달 후로 이동
  const changeIndex_plus = () => {
    setCardIndex(cardIndex + 1);
  };

  let cardName: string[] = [];
  accountList.map((el) => {
    if (el.includes('신한') || el.includes('shinhan')) {
      cardName.push('shinhan');
    } else if (el.includes('삼성') || el.includes('samsung')) {
      cardName.push('samsung');
    } else if (el.includes('카카오') || el.includes('kakao')) {
      cardName.push('kakao');
    } else if (el.includes('롯데') || el.includes('lotte')) {
      cardName.push('lotte');
    } else if (el.includes('우리') || el.includes('woori')) {
      cardName.push('woori');
    } else if (el.includes('현금') || el.includes('cash')) {
      cardName.push('cash');
    } else if (el.includes('현대') || el.includes('hyundai')) {
      cardName.push('hyundai');
    } else if (el.includes('비씨') || el.includes('bc')) {
      cardName.push('bc');
    } else {
      cardName.push('default');
    }
  });

  return (
    <SwipeableViews
      enableMouseEvents
      index={cardIndex}
      disabled={Boolean(true)} //swipe 불가
    >
      {accountList.map((el, i) => (
        <div className="contain">
          {i >= 1 ? <Button onClick={changeIndex_minus}>{left}</Button> : null}
          <button
            className={`card0 ${cardName[i] + '0'}`}
            style={el === account ? style : undefined}
            onClick={() => setAccount(el)}
          >
            {el}
          </button>
          {i < accountList.length - 1 ? (
            <Button onClick={changeIndex_plus}>{right}</Button>
          ) : null}
        </div>
      ))}
    </SwipeableViews>
  );
};

const Button = styled.button`
  border: none;
  background-color: inherit;
  color: black;
  font-size: 45px;
  display: inline-block;
  cursor: pointer;
`;

export default CardSlider;
