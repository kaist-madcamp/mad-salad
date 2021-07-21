import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { PortalConsumer } from '../../providers/PortalProvider';

interface Props {
  children: React.ReactNode;
  isClose: boolean;
  onClose: () => void;
}

export default function Modal({ children, isClose, onClose }: Props) {
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <PortalConsumer>
      <ModalContainer close={isClose} onClick={onClose}>
        <HistoryFormWrapper onClick={clickHandler} close={isClose}>
          {children}
        </HistoryFormWrapper>
      </ModalContainer>
    </PortalConsumer>
  );
}

const blur = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const up = keyframes`
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0%);
    }
`;

const ModalContainer = styled.div<{ close: boolean }>`
  display: flex;
  position: fixed;
  align-items: flex-end;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(3.125rem);
  transition: ${(props) => (props.close ? 'opacity 0.5s' : 'opacity 0.3s')};
  opacity: ${(props) => (props.close ? 0 : 1)};
  animation: ${blur} 0.5s;
  z-index: ${(props) => (props.close ? -1 : 1)};
`;

const HistoryFormWrapper = styled.div<{ close: boolean }>`
  position: relative;
  width: 670px;
  animation: ${up} 550ms cubic-bezier(0.38, 0.24, 0.22, 1);
  bottom: 0px;
  max-height: calc(100% - 30px);
  height: 92%;
  background: ${(props) => props.theme.ModalHslaBgColor};
  border-radius: 30px 30px 0px 0px;
  overflow-y: scroll;
  overflow-x: hidden;
`;
