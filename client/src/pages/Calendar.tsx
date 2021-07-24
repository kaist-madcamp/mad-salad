import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import NewModal from '../components/UI/NewModal';
import SwipeView from '../components/calendar/SwipeView';
import CalendarGrid from '../components/calendar/CalendarGrid';
import PageTitle from '../components/PageTitle';
import {
  MoneyButtonExpenditure,
  MoneyButtonIncome,
} from '../components/anlytics/SumIndicatorWrapper';

const CalendarTab = () => {
  const [openModal, setOpenModal] = useState(false);

  //7월로 setting
  const [index, setIndex] = useState(6);

  //한 달 전으로 이동
  const changeIndex_minus = () => {
    setIndex(index - 1);
  };

  //한 달 후로 이동
  const changeIndex_plus = () => {
    setIndex(index + 1);
  };

  const [income, setIncome] = useState<string[]>([
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
  ]);
  const [outcome, setOutcome] = useState<string[]>([
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
  ]);

  console.log(index);

  return (
    <Container>
      <PageTitle title="Calendar" />
      {/* Add history  */}
      {openModal && <NewModal closeModal={setOpenModal} />}
      <AddBtn onClick={() => setOpenModal(true)}>
        <PlusIcon icon={faPlus} size="2x" />
        <Text>Add History</Text>
      </AddBtn>

      {/* Month Indicator */}
      <SwipeView
        index={index}
        changeIndex_minus={changeIndex_minus}
        changeIndex_plus={changeIndex_plus}
      />

      {/* Sum indicator */}
      <SumIndicatorContainer>
        <SumIndicatorWrapper>
          <MoneyButtonIncome>{'+' + income[index]}</MoneyButtonIncome>
          <MoneyButtonExpenditure>
            {'-' + outcome[index]}
          </MoneyButtonExpenditure>
        </SumIndicatorWrapper>
      </SumIndicatorContainer>

      {/* Calendar  */}
      <CalendarGrid
        index={index}
        income={income}
        setIncome={setIncome}
        outcome={outcome}
        setOutcome={setOutcome}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 70px 0px 0px;
`;

const SumIndicatorContainer = styled.div`
  margin: 30px auto;
  width: calc(100% - 1.875rem);
  max-width: 36.75rem;
`;

const SumIndicatorWrapper = styled.div`
  display: flex;
`;
const AddBtn = styled.button`
  background-color: black;
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 2.6875rem;
  width: 12rem;
  height: 3.1875rem;
  -webkit-box-shadow: 0 0.25rem 1.875rem rgb(0 0 0 / 30%);
  box-shadow: 0 0.25rem 1.875rem rgb(0 0 0 / 30%);
  border-radius: 532.125rem;
  padding-left: 0.25rem;
  color: white;
  justify-content: flex-end;
  margin: 0 auto;
  margin-left: 30px;
  z-index: 5;
  cursor: pointer;
`;

const PlusIcon = styled(FontAwesomeIcon)`
  height: 30px;
  font-size: 2.8125rem;
  border-radius: 50%;
  vertical-align: baseline;
  display: inline-block;
  direction: ltr;
  text-align: center;
  text-align: center;
  margin-left: 12px;
`;

const Text = styled.div`
  width: 110%;
  text-align: center;
  font-weight: 700;
  font-size: 1.25rem;
  margin-left: 7px;
  margin-right: 7px;
`;

const Box = styled.div`
  width: 90%;
  margin: 40px auto;
  display: flex;
  box-sizing: border-box;
  font-size: 30px;
  font-weight: 600;
`;

const BlueBox = styled.div`
  border: 2.5px solid #166ff3;
  padding: 5px;
  flex: 1;
  width: 45%;
  margin-left: 27%;
  margin-right: 1%;
  border-radius: 15px;
  text-align: center;
  color: #166ff3;
`;

const RedBox = styled.div`
  border: 2.5px solid #f8123b;
  padding: 5px;
  flex: 1;
  width: 45%;
  margin-left: 1%;
  margin-right: 27%;
  border-radius: 15px;
  text-align: center;
  color: white;
  background-color: #f8123b;
`;

export default CalendarTab;
