import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const commonTheme = {
  accent: '#0095f6',
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,
  bgColor: '#fafafa',
  borderColor: 'rgb(219, 219, 219)',
  color: 'rgb(38, 38, 38)',
  errorMsgColor: '#ed4956',
};
export const darkTheme: DefaultTheme = {
  ...commonTheme,
  bgColor: '#2c2c2c',
  borderColor: '#1c1c1c',
  color: 'white',
  errorMsgColor: '#fff',
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all: unset
    }
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: 'Open Sans', sans-serif;
        color: ${(props) => props.theme.color};
    }
    a {
        text-decoration: none;
    }
`;
