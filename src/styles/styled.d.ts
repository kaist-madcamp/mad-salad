import "styled-components";

declare module 'styled-components' {
  export interface DefaultTheme {
    accent: string;
    errorMsgColor: string;
    bgColor?: string;
    borderColor?: string;
    color?: string;
  }
}
