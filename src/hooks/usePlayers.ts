import { useState, useEffect } from 'react';

import { Players } from 'types/player';
import { Theme } from 'types/theme';

import { STONE_FIRST, STONE_SECOND } from 'constants';

export const usePlayers = (selectedTheme: Theme) => {
  const PLAYER_FIRST_DEFAULT_NAME = 'プレイヤーA';
  const PLAYER_SECOND_DEFAULT_NAME = 'プレイヤーB';

  const initialPlayersState: Players = {
    first: {
      name: PLAYER_FIRST_DEFAULT_NAME,
      stone: STONE_FIRST,
      color: selectedTheme.first,
      isMyTurn: true,
    },
    second: {
      name: PLAYER_SECOND_DEFAULT_NAME,
      stone: STONE_SECOND,
      color: selectedTheme.second,
      isMyTurn: false,
    },
  };

  const [players, setPlayers] = useState(initialPlayersState);

  useEffect(() => {
    const sessionPlayerFirstName = sessionStorage.getItem('playerFirstName');
    const playerFirstName = sessionPlayerFirstName != null ? sessionPlayerFirstName : PLAYER_FIRST_DEFAULT_NAME;
    const sessionPlayerSecondName = sessionStorage.getItem('playerSecondName');
    const playerSecondName = sessionPlayerSecondName != null ? sessionPlayerSecondName : PLAYER_SECOND_DEFAULT_NAME;
    updatePlayers(playerFirstName, playerSecondName);
  }, []);

  const updatePlayers = (first: string, second: string) => {
    setPlayers((prevState) => ({
      first: { ...prevState.first, name: first },
      second: { ...prevState.second, name: second },
    }));
  };

  const updateSessionPlayers = (first: string, second: string) => {
    sessionStorage.setItem('playerFirstName', first);
    sessionStorage.setItem('playerSecondName', second);
  };

  const initializePlayerTurn = () => {
    setPlayers((prevState) => {
      return {
        first: {
          ...prevState.first,
          isMyTurn: true,
        },
        second: {
          ...prevState.second,
          isMyTurn: false,
        },
      };
    });
  };

  useEffect(() => {
    setPlayers((prevState) => {
      return {
        first: {
          ...prevState.first,
          color: selectedTheme.first,
        },
        second: {
          ...prevState.second,
          color: selectedTheme.second,
        },
      };
    });
  }, [selectedTheme]);

  const changePlayerTurn = () => {
    setPlayers((prevState) => {
      return {
        first: {
          ...prevState.first,
          isMyTurn: !prevState.first.isMyTurn,
        },
        second: {
          ...prevState.second,
          isMyTurn: !prevState.second.isMyTurn,
        },
      };
    });
  };

  return {
    players,
    setPlayers,
    updatePlayers,
    updateSessionPlayers,
    initializePlayerTurn,
    changePlayerTurn,
  };
};
