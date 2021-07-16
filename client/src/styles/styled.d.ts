import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: string;
    errorMsgColor: string;
    bgColor?: string;
    borderColor?: string;
    color?: string;
    checkedColor?: string;
    checkedBgColor?: string;
    backgroundImage?: string;
    backgroundAttachment?: string;
    uncheckedBgColor?: string;
    itemRowBgColor?: string;
    itemRowColor?: string;
  }
}
