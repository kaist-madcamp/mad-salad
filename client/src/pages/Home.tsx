import styled from 'styled-components';

interface Props {
  darkModeInput: [Boolean, () => void];
}

export default function Home({ darkModeInput }: Props) {
  return (
    <div>
      <p>Home page 입니다.</p>
      <button onClick={darkModeInput[1]}>mode 변경</button>
    </div>
  );
}

const Container = styled.div``;
