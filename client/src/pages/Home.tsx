import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import { Switch, Route, Link } from 'react-router-dom';
import routes from '../routes';
import Calendar from './Calendar';
import Analytics from './Analytics';
import HistoryView from './HistoryView';
import Confetti from 'react-confetti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faCalendar,
  faChartBar,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import Backdrop from '../components/UI/Backdrop';
import { PaymentManagerTitle } from '../components/anlytics/payment/PaymentManagerTitle';
import { PaymentManagerHeader } from '../components/anlytics/payment/PaymentManagerHeader';
import { PaymentManagerAddButton } from '../components/anlytics/payment/PaymentManagerAddButton';
import {
  PaymentManagerCard,
  PaymentManagerCardWrapper,
} from '../components/anlytics/payment/PaymentManagerCardWrapper';
import Transfer from '../components/UI/TransferModal';
import ReceiveModal from '../components/UI/ReceiveModal';
import { getPendingTransactionAPI } from '../lib/api/transaction';
import { useQuery } from 'react-query';

interface Props {
  darkModeInput: [boolean, () => void];
}

export default function Home({ darkModeInput }: Props) {
  const [cardListClicked, setCardListClicked] = useState(false);
  const [selectedCardName, setSelectedCardName] = useState('');
  const [showSendTransaction, setShowSendTransaction] = useState(false);

  const [hasPendingTransaction, setHasPendingTransaction] = useState(false);

  const { data: getPendingData } = useQuery(
    'getPending',
    getPendingTransactionAPI,
  );

  useEffect(() => {
    if (!getPendingData) setHasPendingTransaction(true);
  }, [getPendingData]);

  const toggleCardListView = () => {
    console.log('backdrop clicked');
    setCardListClicked((prev) => !prev);
  };

  const sendTransactionHandler = (cardName: string) => {
    setSelectedCardName(cardName);
    setShowSendTransaction(true);
  };

  const PaymentManagerClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  console.log(getPendingData);

  return (
    <Container>
      <PageTitle title="Home" />
      <Navigation>
        <DarkModeBtn onClick={darkModeInput[1]}>
          <FontAwesomeIcon
            color={darkModeInput[0] ? 'white' : 'black'}
            icon={darkModeInput[0] ? faSun : faMoon}
            size="2x"
          />
        </DarkModeBtn>
        <Divider>
          <Line />
        </Divider>
        <Link to={routes.home}>
          <FontAwesomeIcon
            color={darkModeInput[0] ? 'white' : 'black'}
            size="2x"
            icon={faClock}
          />
        </Link>
        <Link to={routes.calendar}>
          <FontAwesomeIcon
            color={darkModeInput[0] ? 'white' : 'black'}
            size="2x"
            icon={faCalendar}
          />
        </Link>
        <Link to={routes.analytics}>
          <FontAwesomeIcon
            color={darkModeInput[0] ? 'white' : 'black'}
            size="2x"
            icon={faChartBar}
          />
        </Link>
        <Divider>
          <Line />
        </Divider>
        <CardListButton onClick={toggleCardListView}>
          <FontAwesomeIcon
            color={darkModeInput[0] ? 'white' : 'black'}
            size="2x"
            icon={faCreditCard}
          />
        </CardListButton>
      </Navigation>

      {hasPendingTransaction ? (
        <ReceiveModal
          getPendingData={getPendingData}
          setHasPendingTransaction={setHasPendingTransaction}
        />
      ) : (
        getPendingData && (
          <Confetti
            friction={0.99}
            gravity={0.3}
            numberOfPieces={300}
            recycle={false}
          />
        )
      )}

      <Switch>
        <Route path="/" exact>
          <HistoryView />
        </Route>
        <Route path={routes.calendar}>
          <Calendar />
        </Route>
        <Route path={routes.analytics}>
          <Analytics />
        </Route>
      </Switch>

      <Backdrop isClose={!cardListClicked} onClose={toggleCardListView}>
        <PaymentManagerHeader>
          <PaymentManagerTitle>Manage your payments</PaymentManagerTitle>
          {/* <PaymentManagerAddButton>
            + Add Payment Method
          </PaymentManagerAddButton> */}
        </PaymentManagerHeader>

        <PaymentManagerCardContainer onClick={PaymentManagerClickHandler}>
          {showSendTransaction && (
            <Transfer
              setCardListClicked={setCardListClicked}
              selectedCardName={selectedCardName}
              setShowSendTransaction={setShowSendTransaction}
            />
          )}
          <PaymentManagerCardWrapper>
            <PaymentManagerCard
              onClick={() => sendTransactionHandler('shinhan')}
              className={`card shinhan`}
            />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('samsung')}
          >
            <PaymentManagerCard className="card samsung" />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('lotte')}
          >
            <PaymentManagerCard className="card lotte" />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('kakao')}
          >
            <PaymentManagerCard className="card kakao" />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('cash')}
          >
            <PaymentManagerCard className={`card cash`} />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('woori')}
          >
            <PaymentManagerCard className="card woori" />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('hyundai')}
          >
            <PaymentManagerCard className="card hyundai" />
          </PaymentManagerCardWrapper>
          <PaymentManagerCardWrapper
            onClick={() => sendTransactionHandler('bc')}
          >
            <PaymentManagerCard className="card bc" />
          </PaymentManagerCardWrapper>
        </PaymentManagerCardContainer>
      </Backdrop>
      {/* Router  */}
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-image: ${(props) => props.theme.backgroundImage};
  background-attachment: ${(props) => props.theme.backgroundAttachment};
`;

const Navigation = styled.nav`
  padding-top: 45px;
  margin: 0 auto 40px;
  display: flex;
  justify-content: space-around;
  height: 47px;
  width: calc(100% - 30px);
  max-width: 588px;
  svg {
    margin: 0 20px;
  }
`;

const Divider = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Line = styled.div`
  height: 40px;
  width: 1px;
  background-color: ${(props) => props.theme.itemRowColor};
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

const CardListButton = styled.div`
  cursor: pointer;
`;

const PaymentManagerCardContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 999;
`;
