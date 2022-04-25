import { useState, useEffect } from 'react';

import { Players } from 'types/player';

export const useCurrentPlayers = (players: Players) => {
  const [currentPlayer, setCurrentPlayer] = useState(players.first);

  const updateCurrentPlayer = () => {
    if (players.first.isMyTurn) {
      setCurrentPlayer(players.first);
    } else {
      setCurrentPlayer(players.second);
    }
  };

  useEffect(() => {
    updateCurrentPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  return {
    currentPlayer,
  };
};
