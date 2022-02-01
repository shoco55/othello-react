import { useState } from 'react';

import { Theme } from '../types/theme';

import { STONE_FIRST, STONE_SECOND, PLAYER_FIRST_DEFAULT_NAME, PLAYER_SECOND_DEFAULT_NAME } from '../constants';

export const usePlayers = (selectedTheme: Theme) => {
  const [playerFirst, setPlayerFirst] = useState({
    name: PLAYER_FIRST_DEFAULT_NAME,
    color: selectedTheme.first,
    stone: STONE_FIRST,
  });

  const [playerSecond, setPlayerSecond] = useState({
    name: PLAYER_SECOND_DEFAULT_NAME,
    color: selectedTheme.second,
    stone: STONE_SECOND,
  });

  const updateSessionPlayerSetting = (key: 'name' | 'color', first: string, second: string) => {
    if (key === 'name') {
      sessionStorage.setItem('playerFirstName', first);
      sessionStorage.setItem('playerSecondName', second);
    }
  };

  const updatePlayerSetting = (key: 'name' | 'color', first: string, second: string) => {
    setPlayerFirst((state) => ({ ...state, [key]: first }));
    setPlayerSecond((state) => ({ ...state, [key]: second }));
  };

  return { playerFirst, setPlayerFirst, playerSecond, setPlayerSecond, updateSessionPlayerSetting, updatePlayerSetting };
};
