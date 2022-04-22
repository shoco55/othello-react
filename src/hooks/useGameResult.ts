import { useState } from 'react';

import { ResultStatus, Result } from 'types/result';
import { BoardState } from 'types/board';

import { RESULT_FIRST_WIN, RESULT_SECOND_WIN, RESULT_DRAW, STONE_FIRST, STONE_SECOND } from '../constants';

export const useGameResult = (boardState: BoardState) => {
  const [gameResult, setGameResult] = useState<Result>({
    status: RESULT_DRAW,
    firstStoneNumber: 0,
    secondStoneNumber: 0,
  });

  const updateGameResult = ({ status, firstStoneNumber, secondStoneNumber }: Result) => {
    setGameResult({ status, firstStoneNumber, secondStoneNumber });
  };

  const [isGameOver, setIsGameOver] = useState(false);

  const updateIsGameOver = (flag: boolean) => {
    setIsGameOver(flag);
  };

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

  const endGame = () => {
    const { firstStoneNumber, secondStoneNumber } = getStoneNumber();

    let status: ResultStatus;

    if (firstStoneNumber > secondStoneNumber) {
      status = RESULT_FIRST_WIN;
    } else if (firstStoneNumber < secondStoneNumber) {
      status = RESULT_SECOND_WIN;
    } else {
      status = RESULT_DRAW;
    }

    updateIsGameOver(true);

    updateGameResult({ status, firstStoneNumber, secondStoneNumber });
  };

  return { gameResult, isGameOver, updateIsGameOver, endGame };
};
