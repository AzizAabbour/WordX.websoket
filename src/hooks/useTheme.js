import { useSelector, useDispatch } from 'react-redux';
import { setTheme, toggleTheme } from '../store/slices/uiSlice';
import { useEffect } from 'react';

export function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.ui.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return {
    theme,
    isDark: theme === 'dark',
    setTheme: (t) => dispatch(setTheme(t)),
    toggleTheme: () => dispatch(toggleTheme()),
  };
}
