import styled from 'styled-components';
import { BaseBox } from '../shared';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  link: string;
}

export default function BottomBox({ title, description, link }: Props) {
  return (
    <SBottomBox>
      <span>{description}</span>
      <Link to={link}>{title}</Link>
    </SBottomBox>
  );
}

const SBottomBox = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  background-color: ${props => props.theme.bgColor};
  span {
    color: ${props => props.theme.color};
    margin-right: 5px;
  }
  a {
    color: ${(props) => props.theme.accent};
    font-weight: 600;
  }
`;
