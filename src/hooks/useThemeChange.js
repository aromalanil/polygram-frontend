import { useEffect } from 'react';
import { useRhinoValue } from '../global/state';

const useThemeChange = () => {
  const theme = useRhinoValue('theme');

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
    const newClassNames = `${theme.isDarkMode ? 'dark' : ''} ${theme.accent}`;
    document.body.className = newClassNames;
  }, [theme]);
};

export default useThemeChange;
