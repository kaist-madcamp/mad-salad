import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  createdAt?: string;
}

export default function HistoryColumn({ children, createdAt }: Props) {
  return (
    <Column>
      <DateIndicator>THU, 6th</DateIndicator>
      {children}
    </Column>
  );
}

const Column = styled.div`
  width: 100%;
`;
const DateIndicator = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.1875rem;
  text-align: center;
  color: #979797;
`;
