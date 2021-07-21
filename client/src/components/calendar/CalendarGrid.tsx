import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EditModal from './EditModal';
import '../UI/Modal.css';
import GetMonthHistory from '../query/GetMonthHistory';
import { FetchHistoryData } from '../../lib/api/types';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);
const now = new Date();

interface Props {
  index: number;
  income: string[];
  setIncome: React.Dispatch<React.SetStateAction<string[]>>;
  outcome: string[];
  setOutcome: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ClickedDataType {
  title: string;
  allDay: boolean;
  start: Date;
  end: Date;
  index: number;
}

const CalendarGrid = ({
  index,
  income,
  setIncome,
  outcome,
  setOutcome,
}: Props) => {
  now.setMonth(index);
  const [openModal, setOpenModal] = useState(false);
  const [monthData, setMonthData] = useState<FetchHistoryData[]>([]);
  const [history, setHistory] = useState<ClickedDataType[]>([]);
  const [clickedEvent, setClickedEvent] = useState<ClickedDataType>();

  const popUp = (clickedData: ClickedDataType) => {
    setClickedEvent(clickedData);
    setOpenModal(true);
  };

  const eventStyleGetter = (event: ClickedDataType) => {
    let style;
    if (event?.title?.slice(0, 1) === '-') {
      style = {
        backgroundColor: 'transparent',
        color: 'crimson',
        fontWeight: 700,
        paddingRight: '10px',
        textAlign: 'right' as 'right',
      };
    } else {
      style = {
        backgroundColor: 'transparent',
        color: 'royalblue',
        fontWeight: 700,
      };
    }
    return {
      style,
    };
  };

  return (
    <div
      style={{
        height: 700,
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 40,
        paddingBottom: 100,
      }}
    >
      <GetMonthHistory
        index={index}
        setHistory={setHistory}
        setMonthData={setMonthData}
        income={income}
        setIncome={setIncome}
        outcome={outcome}
        setOutcome={setOutcome}
      />
      {openModal && (
        <EditModal
          setOpenModal={setOpenModal}
          monthData={monthData}
          clickedData={clickedEvent}
        />
      )}
      <Calendar
        toolbar={false}
        localizer={localizer}
        events={history}
        step={60}
        views={['month']}
        defaultDate={now}
        onSelectEvent={popUp}
        eventPropGetter={eventStyleGetter}
        showAllEvents={Boolean(true)}
        doShowMoreDrillDown={Boolean(true)}
      />
    </div>
  );
};

export default CalendarGrid;
