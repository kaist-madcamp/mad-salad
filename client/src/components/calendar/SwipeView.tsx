import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import styled from 'styled-components';
import { MonthBtn } from '../anlytics/MonthSelectorWrapper';

const list = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

interface Props {
  index: number;
  changeIndex_minus: () => void;
  changeIndex_plus: () => void;
}
const SwipeView = ({ index, changeIndex_minus, changeIndex_plus }: Props) => {
  return (
    <SwipeableViews
      enableMouseEvents
      index={index}
      disabled={true} //swipe 불가
    >
      {list.map((el, i) => (
        <React.Fragment key={i}>
          <MonthList>
            <MonthBefore>
              {i >= 1 ? (
                <Year>
                  2021
                  <br />
                </Year>
              ) : null}
              <MonthBtnLeft onClick={changeIndex_minus}>
                {list[i - 1]}
              </MonthBtnLeft>
            </MonthBefore>
            <MonthCurrent>
              <Year>
                2021
                <br />
              </Year>
              <MonthBtn>{el}</MonthBtn>
            </MonthCurrent>
            <MonthAfter>
              {i <= 10 ? (
                <Year>
                  2021
                  <br />
                </Year>
              ) : null}
              <MonthBtnRight onClick={changeIndex_plus}>
                {list[i + 1]}
              </MonthBtnRight>
            </MonthAfter>
          </MonthList>
        </React.Fragment>
      ))}
    </SwipeableViews>
  );
};

const MonthList = styled.div`
  width: 90%;
  margin: 10px auto;
  display: flex;
  box-sizing: border-box;
  text-align: center;
  font-weight: bolder;
`;

const MonthBefore = styled.div`
  color: darkgray;
  flex: 1;
  width: 25%;
  font-size: 45px;
`;

const MonthCurrent = styled.div`
  color: black;
  display: 'center';
  padding: 15;
  height: 100;
  color: '#000';
  flex: 1;
  width: 40%;
  font-size: 45px;
`;

const MonthAfter = styled.div`
  color: darkgray;
  flex: 1;
  width: 25%;
  font-size: 45px;
`;

const Year = styled.div`
  font-weight: normal;
  font-size: 19px;
`;

const MonthBtnLeft = styled.button`
  border: none;
  background-color: inherit;
  font-size: 45px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  /* color: darkgray; */
  background: linear-gradient(to left, darkgray, white);
  color: transparent;
  -webkit-background-clip: text;
`;

const MonthBtnRight = styled.button`
  border: none;
  background-color: inherit;
  font-size: 45px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  background: linear-gradient(to right, darkgray, white);
  color: transparent;
  -webkit-background-clip: text;
`;

export default SwipeView;
