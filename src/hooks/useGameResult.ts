import { useState, useEffect } from 'react';

import { BoardState } from 'types/board';
import { ResultStatus, GameResult, GameState } from 'types/game';

import { STONE_FIRST, STONE_SECOND, RESULT_FIRST_WIN, RESULT_SECOND_WIN, RESULT_DRAW } from '../constants';

export const useGameResult = (boardState: BoardState, gameState: GameState) => {
  const [gameResult, setGameResult] = useState<GameResult>({
    status: RESULT_DRAW,
    firstStoneNumber: 0,
    secondStoneNumber: 0,
  });

  const getStoneNumber = () => {
    let firstStoneNumber = 0;
    let secondStoneNumber = 0;

    boardState.forEach((row) =>
      row.forEach((state) => {
        if (state === STONE_FIRST) {
          firstStoneNumber += 1;
        } else if (state === STONE_SECOND) {
          secondStoneNumber += 1;
        }
      })
    );
    return {
      firstStoneNumber,
      secondStoneNumber,
    };
  };

  const updateGameResult = () => {
    const { firstStoneNumber, secondStoneNumber } = getStoneNumber();

    let status: ResultStatus;

    if (firstStoneNumber > secondStoneNumber) {
      status = RESULT_FIRST_WIN;
    } else if (firstStoneNumber < secondStoneNumber) {
      status = RESULT_SECOND_WIN;
    } else {
      status = RESULT_DRAW;
    }

    setGameResult({ status, firstStoneNumber, secondStoneNumber });
  };

  useEffect(() => {
    if (gameState.isGameOver) {
      updateGameResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isGameOver]);

  return {
    gameResult,
  };
};
