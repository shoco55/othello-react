import { useState } from 'react';

import { Player } from 'types/player';

export const useCurrentPlayer = (playerFirst: Player, playerSecond: Player) => {
  const [currentPlayer, setCurrentPlayer] = useState(playerFirst);

  const updateCurrentPlayer = () => {
    switch (currentPlayer.stone) {
      case playerFirst.stone:
        setCurrentPlayer((state) => ({ ...state, name: playerFirst.name, color: playerFirst.color }));
        break;
      case playerSecond.stone:
        setCurrentPlayer((state) => ({ ...state, name: playerSecond.name, color: playerSecond.color }));
        break;
      // no default
    }
  };

  const changePlayerTurn = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer.stone === playerFirst.stone ? playerSecond : playerFirst));
  };

  const resetPlayerTurn = () => {
    setCurrentPlayer(playerFirst);
  };

  return { currentPlayer, updateCurrentPlayer, changePlayerTurn, resetPlayerTurn };
};
