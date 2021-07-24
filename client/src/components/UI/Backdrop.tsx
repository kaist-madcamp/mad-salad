import styled from 'styled-components';
import { PortalConsumer } from '../../providers/PortalProvider';

interface Props {
  children: React.ReactNode;
  isClose: boolean;
  onClose: () => void;
}

export default function Backdrop({ children, isClose, onClose }: Props) {
  return (
    <PortalConsumer>
      <BackdropContainer close={isClose} onClick={onClose}>
        {children}
      </BackdropContainer>
    </PortalConsumer>
  );
}

const BackdropContainer = styled.div<{ close: boolean }>`
  opacity: 1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(30px) saturate(1.7);
  opacity: 0;
  z-index: -1;
  transition: opacity 500ms ease;
  will-change: opacity;
  transition: ${(props) => (props.close ? 'opacity 0.5s' : 'opacity 0.3s')};
  opacity: ${(props) => (props.close ? 0 : 1)};
  z-index: ${(props) => (props.close ? -10 : 10)};
`;
