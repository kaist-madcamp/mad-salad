import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

interface Props {
  children: React.ReactNode;
  darkModeInput: [boolean, () => void];
}

export default function AuthLayout({ children, darkModeInput }: Props) {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkModeInput[1]}>
          <FontAwesomeIcon
            color={darkModeInput[0] ? 'white' : 'dark'}
            icon={darkModeInput[0] ? faSun : faMoon}
            size="2x"
          />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;
