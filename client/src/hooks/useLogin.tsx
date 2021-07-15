import { useEffect, useState } from 'react';

export const TOKEN = 'TOKEN';

export default function useAuth(token: string | null) {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN, token);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem(TOKEN);
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn;
}
