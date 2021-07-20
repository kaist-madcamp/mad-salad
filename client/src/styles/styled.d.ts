import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: string;
    opositeColor?: string;
    errorMsgColor: string;
    bgColor?: string;
    borderColor?: string;
    color?: string;
    selectedColor?: string;
    selectedBgColor?: string;
    unselectedBgColor?: string;
    unselectedColor?: string;
    backgroundImage?: string;
    backgroundAttachment?: string;
    itemRowBgColor?: string;
    itemRowColor?: string;
    linearGradientLeft?: string;
    linearGradientRight?: string;
  }
}
