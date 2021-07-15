import React from 'react';
import styled from 'styled-components';
import useDarkMode from '../../hooks/useDarkmode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

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

interface Props {
  children: React.ReactNode;
  toggleDarkMode: () => void;
}

export default function AuthLayout({ children, toggleDarkMode }: Props) {
  const [darkMode] = useDarkMode();

  console.log('authlayout rendered');
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={toggleDarkMode}>
          <FontAwesomeIcon
            color={darkMode ? 'white' : 'dark'}
            icon={darkMode ? faSun : faMoon}
            size="2x"
          />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
}
