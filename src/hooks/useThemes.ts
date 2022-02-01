import { useState } from 'react';

import { Theme } from '../types/theme';

import { THEME_COLORS } from '../constants';

export const useThemes = () => {
  const [selectedTheme, setSelectedTheme] = useState(THEME_COLORS[0]);

  const updateSessionTheme = (theme: Theme) => {
    sessionStorage.setItem('theme', String(theme.id));
  };

  const updateTheme = (theme: Theme) => {
    setSelectedTheme(theme);
    // updatePlayerSetting('color', theme.first, theme.second);
  };
  return { selectedTheme, updateSessionTheme, updateTheme };
};
