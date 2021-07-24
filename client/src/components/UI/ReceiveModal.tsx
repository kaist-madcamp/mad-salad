import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './ReceiveModal.css';
import { useMutation } from 'react-query';
import { GetPendingTransactionData } from '../../lib/api/types.d';
import { ReceivePendingTransactionAPI } from '../../lib/api/transaction';
import { priceToString } from '../../lib/helper';

const modalBackground = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface Props {
  setHasPendingTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  getPendingData?: GetPendingTransactionData | undefined;
}

const ReceiveModal = ({ setHasPendingTransaction, getPendingData }: Props) => {
  const { mutateAsync, isLoading } = useMutation(ReceivePendingTransactionAPI);

  const onReceive = async (transactionId: number) => {
    try {
      const { data } = await mutateAsync({
        transactionId: transactionId + '',
        reply: 'RECEIVE',
      });
      if (!data.ok) alert(data.error);
      console.log('receive 성공!');
      setHasPendingTransaction(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const onDeny = async (transactionId: number) => {
    if (
      !window.confirm(
        '거절하면 돈은 허공으로 날아갑니다. 정말로 거절하시겠습니까?',
      )
    )
      return null;
    try {
      const { data } = await mutateAsync({
        transactionId: transactionId + '',
        reply: 'DENY',
      });
      if (!data.ok) alert(data.error);
      console.log('deny 성공!');
      setHasPendingTransaction(false);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  if (!getPendingData) return null;

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="receiveModalBackground"
          variants={modalBackground}
          initial="hidden"
          animate="visible"
        >
          <PendingTransactionContainer>
            <Title className="card kakao">아껴써라</Title>
            <Row>보낸 사람 : {getPendingData?.user.name}</Row>
            <Row>금액 : {priceToString(getPendingData?.amount)}</Row>
            <Row>날짜 : {getPendingData?.createdAt.slice(0, 10)}</Row>
            <Row>메세지 : {getPendingData?.content}</Row>
            <Message>봉투가 도착했어요.</Message>
            <ReceiveBtn onClick={() => onReceive(getPendingData?.id)}>
              {isLoading ? '받는중... ' : '받기'}
            </ReceiveBtn>
            <ReceiveBtn onClick={() => onDeny(getPendingData?.id)}>
              {isLoading ? '거절중...' : '거절하기'}
            </ReceiveBtn>
          </PendingTransactionContainer>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const PendingTransactionContainer = styled.div`
  width: 400px;
  height: 550px;
  border-radius: 10px;
  background-color: #eee;
  padding: 20px;
`;

const Row = styled.div`
  margin: 20px 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(
    circle at 0% 0%,
    var(--start, #fff),
    var(--end, #e0e0e3)
  );
  --name-color-white: rgba(255, 255, 255, 0.5);
  width: 350px;
  height: 150px;
  border-radius: 10px;
  font-family: cursive;
  margin: 0px auto;
  font-weight: 800;
  font-size: 44px;
`;

const Message = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
  padding: 10px;
`;

const ReceiveBtn = styled.button`
  padding: 10px;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  border: none;
  background: #54aafc;
  outline: none;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  margin-top: 20px;
  color: white;

  & + & {
    margin-top: 20px;
    background-color: #ee4337;
  }
  cursor: pointer;
`;

export default ReceiveModal;
