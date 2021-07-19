import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import { Switch, Route, Link } from 'react-router-dom';
import routes from '../routes';
import Calendar from './Calendar';
import Analytics from './Analytics';
import HistoryView from './HistoryView';

interface Props {
  darkModeInput: [boolean, () => void];
}

export default function Home({ darkModeInput }: Props) {
  return (
    <Container>
      <PageTitle title="Home" />
      <Navigation>
        <button onClick={darkModeInput[1]}>mode 변경</button>
        <Link to={routes.home}>
          <p>홈</p>
        </Link>
        <Link to={routes.calendar}>
          <p>캘린더</p>
        </Link>
        <Link to={routes.analytics}>
          <p>차트</p>
        </Link>
      </Navigation>

      {/* Router  */}
      <Switch>
        <Route path="/" exact>
          <HistoryView />
        </Route>
        <Route path={routes.calendar}>
          <Calendar />
        </Route>
        <Route path={routes.analytics}>
          <Analytics />
        </Route>
      </Switch>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-image: ${(props) => props.theme.backgroundImage};
  background-attachment: ${(props) => props.theme.backgroundAttachment};
`;

const Navigation = styled.nav`
  display: flex;
  padding: 3.4375rem;
  height: 2.9375rem;
  width: calc(100% - 1.875rem);
  justify-content: space-around;
  align-items: center;
`;
