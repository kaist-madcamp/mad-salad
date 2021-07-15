import { useEffect, useState } from 'react';

const DARK_MODE = 'DARK_MODE';

export default function useDarkMode(): [Boolean, () => void] {
  const [isDark, setIsDark] = useState<boolean>(
    Boolean(localStorage.getItem(DARK_MODE)),
  );

  const toggleDarkMode = () => {
    if (isDark) {
      localStorage.removeItem(DARK_MODE);
      setIsDark(false);
    } else {
      localStorage.setItem(DARK_MODE, 'enabled');
      setIsDark(true);
    }
  };

  return [isDark, toggleDarkMode];
}
