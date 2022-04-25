import { useState } from 'react';

export const useGameState = (
  isBoardFull: () => boolean,
  hasBoardOnlyOneColor: () => boolean,
  canPlaceStone: () => boolean
) => {
  const [gameState, setGameState] = useState({ passedFlag: false, isGameOver: false });

  const updatePassedFlag = (flag: boolean) => {
    setGameState((prevState) => ({ ...prevState, passedFlag: flag }));
  };

  const updateIsGameOver = (flag: boolean) => {
    setGameState((prevState) => ({ ...prevState, isGameOver: flag }));
  };

  const determineNextTurn = () => {
    if (isBoardFull() || hasBoardOnlyOneColor()) {
      endGame();
      return;
    }

    if (!canPlaceStone()) {
      if (gameState.passedFlag) {
        endGame();
      } else {
        updatePassedFlag(true);
        return;
      }
    }

    updatePassedFlag(false);
  };

  const endGame = () => {
    updateIsGameOver(true);
  };

  return {
    gameState,
    updatePassedFlag,
    updateIsGameOver,
    determineNextTurn,
  };
};
