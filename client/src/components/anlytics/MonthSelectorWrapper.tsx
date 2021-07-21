import React, { useState } from 'react';
import styled from 'styled-components';
import { FetchHistoryInput } from '../../lib/api/types.d';
import SwipeableViews from 'react-swipeable-views';

interface Props {
  monthDate: number;
  onClicked: (data: FetchHistoryInput) => void;
}

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

export default function MonthSelectorWrapper({ monthDate, onClicked }: Props) {
  const monthIndex = monthDate - 1;

  return (
    <SwipeableViews
      enableMouseEvents
      index={monthIndex}
      disabled={true} //swipe 불가
    >
      {list.map((el, i) => (
        <React.Fragment key={i}>
          <MonthList>
            <MonthBefore>
              {i >= 1 ? (
                <Year className="year">
                  2021
                  <br />
                </Year>
              ) : null}
              <MonthBtnLeft
                onClick={() => onClicked({ year: 2021, month: monthDate - 1 })}
              >
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
              <MonthBtnRight
                onClick={() => onClicked({ year: 2021, month: monthDate + 1 })}
              >
                {list[i + 1]}
              </MonthBtnRight>
            </MonthAfter>
          </MonthList>
        </React.Fragment>
      ))}
    </SwipeableViews>
  );
}
const MonthList = styled.div`
  width: 90%;
  margin: 10px auto;
  display: flex;
  box-sizing: border-box;
  text-align: center;
  font-weight: bolder;
`;

const MonthCurrent = styled.div`
  color: black;
  display: 'center';
  padding: 15;
  height: 100;
  color: ${(props) => props.theme.opositeColor};
  flex: 1;
  width: 40%;
  font-size: 45px;
`;

const MonthBefore = styled.div`
  color: darkgray;
  flex: 1;
  width: 25%;
  font-size: 45px;
  &:hover {
    button,
    div {
      color: ${(props) => props.theme.opositeColor};
      transition: color 0.4s ease;
    }
  }
`;

const MonthAfter = styled.div`
  color: darkgray;
  flex: 1;
  width: 25%;
  font-size: 45px;
  &:hover {
    button,
    div {
      color: ${(props) => props.theme.opositeColor};
      transition: color 0.4s ease;
    }
  }
`;

const Year = styled.div`
  font-weight: normal;
  font-size: 19px;
`;

export const MonthBtn = styled.button`
  border: none;
  color: inherit;
  background-color: inherit;
  font-size: 45px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
`;
const MonthBtnLeft = styled.button`
  border: none;
  background-color: inherit;
  font-size: 45px;
  cursor: pointer;
  display: inline-block;
  font-weight: bold;
  background: ${(props) => props.theme.linearGradientLeft};
  color: transparent;
  -webkit-background-clip: text;
`;

const MonthBtnRight = styled.button`
  border: none;
  background-color: inherit;
  font-size: 45px;
  display: inline-block;
  font-weight: bold;
  background: linear-gradient(to left, #333 30%, #aaa);
  background: ${(props) => props.theme.linearGradientRight};
  color: transparent;
  -webkit-background-clip: text;
  cursor: pointer;
`;
