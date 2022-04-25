import { useState, useEffect } from 'react';

import { Theme } from 'types/theme';

import { THEME_COLORS } from 'constants';

export const useThemes = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEME_COLORS[0]);

  useEffect(() => {
    const sessionThemeId = sessionStorage.getItem('theme');
    if (sessionThemeId == null) return;
    const theme = THEME_COLORS.find((themeColor) => themeColor.id === Number(sessionThemeId));
    updateTheme(theme || THEME_COLORS[0]);
  }, []);

  const updateTheme = (theme: Theme) => {
    setSelectedTheme(theme);
  };

  const updateSessionTheme = (theme: Theme) => {
    sessionStorage.setItem('theme', String(theme.id));
  };

  return { selectedTheme, updateSessionTheme, updateTheme };
};
