import { Redirect, Route, Switch } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { darkTheme, GlobalStyles, lightTheme } from './styles/styles';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import routes from './routes';
import NotFound from './pages/NotFound';
import { ThemeProvider } from 'styled-components';
import useAuth from './hooks/useLogin';
import useDarkMode from './hooks/useDarkmode';
import { PortalProvider } from './providers/PortalProvider';

function App() {
  const [isDarkTheme, toggleDarkMode] = useDarkMode();
  const [isLoggedIn, toggleLogInOut] = useAuth();

  return (
    <PortalProvider>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <HelmetProvider>
          <GlobalStyles />
          <Switch>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <SignUp darkModeInput={[isDarkTheme, toggleDarkMode]} />
              </Route>
            ) : null}

            <Route path={routes.home}>
              {isLoggedIn ? (
                <Home darkModeInput={[isDarkTheme, toggleDarkMode]} />
              ) : (
                <Login
                  useAuthHookInput={[isLoggedIn, toggleLogInOut]}
                  darkModeInput={[isDarkTheme, toggleDarkMode]}
                />
              )}
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </HelmetProvider>
      </ThemeProvider>
    </PortalProvider>
  );
}

export default App;
