import styled from 'styled-components';

interface Props {
  toggleTheme: () => void;
}

export default function Home({ toggleTheme }: Props) {
  return (
    <div>
      <p>Home page 입니다.</p>
      <button onClick={toggleTheme}>
        mode 변경
      </button>
    </div>
  );
}

const Container = styled.div``;
