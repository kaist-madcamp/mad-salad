import { useState } from 'react';

export const TOKEN = 'TOKEN';

export default function useAuth(): [
  boolean,
  (token: string | undefined) => void,
] {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Boolean(localStorage.getItem(TOKEN)),
  );

  const toggleLogInOut = (token: string | undefined) => {
    if (isLoggedIn) {
      localStorage.removeItem(TOKEN);
      setIsLoggedIn(false);
    } else {
      if (!token) return;
      localStorage.setItem(TOKEN, token);
      setIsLoggedIn(true);
    }
  };

  return [isLoggedIn, toggleLogInOut];
}
