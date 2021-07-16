import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const commonTheme = {
  accent: '#33CC33',
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,
  bgColor: '#fafafa',
  borderColor: 'rgb(219, 219, 219)',
  color: 'rgb(38, 38, 38)',
  errorMsgColor: '#ed4956',
  checkedColor: '#ffffff',
  uncheckedBgColor: '#eee',
  checkedBgColor: 'rgb(51, 51, 51)',

  itemRowColor: '#333',
  itemRowBgColor: '#f0f0f0',
};
export const darkTheme: DefaultTheme = {
  ...commonTheme,
  bgColor: '#000',
  borderColor: '#1c1c1c',
  color: '#fff',
  errorMsgColor: '#fff',
  checkedColor: '#000',
  checkedBgColor: '#eee',
  backgroundImage: 'linear-gradient(315deg, #434343 0%, #000 74%)',
  backgroundAttachment: 'fixed',

  itemRowBgColor: '#333',
  itemRowColor: '#fff',
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
    div {
      font-size: 18px;
    }
`;
