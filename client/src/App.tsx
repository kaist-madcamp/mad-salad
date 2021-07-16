import { Route, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { darkTheme, GlobalStyles, lightTheme } from './styles/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import routes from './routes';
import NotFound from './pages/NotFound';
import { ThemeProvider } from 'styled-components';
import useAuth, { TOKEN } from './hooks/useLogin';
import useDarkMode from './hooks/useDarkmode';

function App() {
  const [isDarkTheme, toggleDarkMode] = useDarkMode();
  const isLoggedIn = useAuth(localStorage.getItem(TOKEN));

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <HelmetProvider>
        <GlobalStyles />
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn ? (
              <Home darkModeInput={[isDarkTheme, toggleDarkMode]} />
            ) : (
              <Login darkModeInput={[isDarkTheme, toggleDarkMode]} />
            )}
          </Route>

          {!isLoggedIn ? (
            <Route path={routes.signUp}>
              <SignUp darkModeInput={[isDarkTheme, toggleDarkMode]} />
            </Route>
          ) : null}

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;