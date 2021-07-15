import { InputHTMLAttributes, forwardRef, Ref } from 'react';
import styled from 'styled-components';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const SInput = styled.input<Props>`
  background-color: ${props => props.theme.bgColor};
  padding: 7px 10px;
  border-radius: 3px;
  border: 0.5px solid
    ${(props) => (props.hasError ? props.theme.errorMsgColor : props.theme.borderColor)};
  width: 100%;
  box-sizing: border-box;
  margin: 5px 0;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  } 
`;

const Input = forwardRef((props: Props, ref: Ref<HTMLInputElement>) => {
  return <SInput ref={ref} {...props} />;
});

export default Input;
