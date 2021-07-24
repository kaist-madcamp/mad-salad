import { createGlobalStyle, DefaultTheme } from 'styled-components';
import reset from 'styled-reset';

const commonTheme = {
  accent: '#33CC33',
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,
  opositeColor: '#000',
  bgColor: '#fafafa',
  borderColor: 'rgb(219, 219, 219)',
  color: 'rgb(38, 38, 38)',
  errorMsgColor: '#ed4956',

  selectedColor: '#eee',
  selectedBgColor: 'rgb(51, 51, 51)',
  unselectedColor: 'rgb(51, 51, 51)',
  unselectedBgColor: '#eee',

  itemRowColor: '#333',
  itemRowBgColor: '#f0f0f0',

  linearGradientLeft: 'linear-gradient(to left, darkgray, white)',
  linearGradientRight: 'linear-gradient(to left, darkgray, white)',

  ModalHslaBgColor: '#fff'
};
export const darkTheme: DefaultTheme = {
  ...commonTheme,
  opositeColor: '#fff',
  bgColor: '#000',
  borderColor: '#1c1c1c',
  color: '#fff',
  errorMsgColor: '#fff',

  selectedColor: 'rgb(51, 51, 51)',
  selectedBgColor: '#eee',
  unselectedColor: '#eee',
  unselectedBgColor: 'rgb(51, 51, 51)',

  backgroundImage: 'linear-gradient(315deg, #434343 0%, #000 74%)',
  backgroundAttachment: 'fixed',

  itemRowBgColor: '#333',
  itemRowColor: '#fff',

  linearGradientLeft: 'linear-gradient(to right, #333 30%, #aaa)',
  linearGradientRight: 'linear-gradient(to left, #333 30%, #aaa)',

  ModalHslaBgColor: 'hsla(0, 0%, 40%, 0.56863)'
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    html {
      scroll-behavior: smooth;
    }
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
    .card {
      --size: 370px;
      width: var(--size);
      height: calc(var(--size) * 0.5864);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      border-radius: calc(var(--size) * 0.04);
      position: relative;
      background-color: #54aafc;
      background-image: radial-gradient(circle at 0% 0%, var(--start, #fff), var(--end, #e0e0e3));
  --name-color-white: rgba(255, 255, 255, 0.5);
    }
    .card::before {
      content: var(--name, "Card");
      font-family: "PAYW Pro", "PAYW Pro KR", sans-serif;
      font-size: calc(var(--size) / 14);
      font-weight: 600;
      color: var(--text-color, #333);
      display: inline-block;
      margin: calc(var(--size) / 13) 0 0 calc(var(--size) / 13);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    .card.kakao {
      --name: "Kakao";
      --start: #ffda55;
      --end: #ff9900;
      --text-color: #6f3806;
    }
    .card.shinhan {
      --name: "Shinhan";
      --start: #fff3c9;
      --end: #63a1ff;
      --text-color: #605645;
    }
    .card.samsung {
      --name: "Samsung";
      --start: #467aff;
      --end: #1b45b2;
      --text-color: #c4d0fd;
      --name-color: var(--name-color-white);
    }
    .card.lotte {
      --name: "Lotte";
      --start: #f13e74;
      --end: #7e4242;
      --text-color: #ffb0c3;
      --name-color: var(--name-color-white);
    }
    .card.woori {
      --name: "Woori";
      --start: #9de8ff;
      --end: #3484ce;
      --text-color: #0f3e69;
    }
    .card.cash {
      --name: "Cash";
      --start: #d4d66f;
      --end: #66b105;
      --text-color: #224804;
    }
    .card.hyundai {
      --name: "Hyundai";
      --start: #795e44;
      --end: #2e2a27;
      --text-color: #f5d1c1;
      --name-color: var(--name-color-white);
    }
    .card.bc {
      --name: "BC";
      --start: #ff9f8a;
      --end: #f45c06;
      --text-color: #940606;
    }
`;
