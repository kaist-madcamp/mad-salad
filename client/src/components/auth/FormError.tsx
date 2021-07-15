import styled from 'styled-components';

export const SFormError = styled.span`
  color: ${props => props.theme.errorMsgColor};
  font-size: 12px;
  font-weight: 600;
  margin: 3px;
`;

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <SFormError>{message}</SFormError>;
}