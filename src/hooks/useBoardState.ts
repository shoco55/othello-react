import { useState } from 'react';

import { Player } from 'types/player';
import { BoardState } from 'types/board';

import { BOARD_SIZE, STONE_EMPTY, INITIAL_BOARD_STATE } from 'constants';

export const useBoardState = (currentPlayer: Player) => {
  const [boardState, setBoardState] = useState<BoardState>(INITIAL_BOARD_STATE);

  const isInitialBoardState = (board: BoardState) => {
    return JSON.stringify(board) === JSON.stringify(INITIAL_BOARD_STATE);
  };

  const initializeBoardState = () => {
    setBoardState(INITIAL_BOARD_STATE);
  };

  const hasBoardStateChange = (nextBoard: BoardState) => {
    return JSON.stringify(nextBoard) !== JSON.stringify(boardState);
  };

  const updateBoardState = (x: number, y: number) => {
    const nextBoard = nextBoardState(x, y);

    if (!hasBoardStateChange(nextBoard)) return;

    nextBoard[y][x] = currentPlayer.stone;
    setBoardState(nextBoard);
  };

  const nextBoardState = (x: number, y: number) => {
    if (boardState[y][x] !== STONE_EMPTY) return boardState;

    const STONE_CURRENT_PLAYER = currentPlayer.stone;
    const nextBoard = boardState.map((array) => array.slice());

    // 左
    for (let i = x - 1; i >= 0; i--) {
      if (nextBoard[y][i] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[y][i] === STONE_CURRENT_PLAYER) {
        for (let j = i; j < x; j++) {
          nextBoard[y][j] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 上
    for (let i = y - 1; i >= 0; i--) {
      if (nextBoard[i][x] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[i][x] === STONE_CURRENT_PLAYER) {
        for (let j = i; j < y; j++) {
          nextBoard[j][x] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 右
    for (let i = x + 1; i < BOARD_SIZE; i++) {
      if (nextBoard[y][i] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[y][i] === STONE_CURRENT_PLAYER) {
        for (let j = i; x < j; j--) {
          nextBoard[y][j] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 下
    for (let i = y + 1; i < BOARD_SIZE; i++) {
      if (nextBoard[i][x] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[i][x] === STONE_CURRENT_PLAYER) {
        for (let j = i; y < j; j--) {
          nextBoard[j][x] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 左上
    for (let i = x - 1, j = y - 1; i >= 0 && j >= 0; i--, j--) {
      if (nextBoard[j][i] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[j][i] === STONE_CURRENT_PLAYER) {
        for (let k = i, l = j; k < x && l < y; k++, l++) {
          nextBoard[l][k] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 右上
    for (let i = x + 1, j = y - 1; i < BOARD_SIZE && j >= 0; i++, j--) {
      if (nextBoard[j][i] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[j][i] === STONE_CURRENT_PLAYER) {
        for (let k = i, l = j; k > x && l < y; k--, l++) {
          nextBoard[l][k] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 右下
    for (let i = x + 1, j = y + 1; i < BOARD_SIZE && j < BOARD_SIZE; i++, j++) {
      if (nextBoard[j][i] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[j][i] === STONE_CURRENT_PLAYER) {
        for (let k = i, l = j; k > x && l > y; k--, l--) {
          nextBoard[l][k] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    // 左下
    for (let i = x - 1, j = y + 1; i < BOARD_SIZE && j < BOARD_SIZE; i--, j++) {
      if (nextBoard[j][i] === STONE_EMPTY) {
        break;
      }
      if (nextBoard[j][i] === STONE_CURRENT_PLAYER) {
        for (let k = i, l = j; k < x && l > y; k++, l--) {
          nextBoard[l][k] = STONE_CURRENT_PLAYER;
        }
        break;
      }
    }

    return nextBoard;
  };

  return {
    boardState,
    isInitialBoardState,
    initializeBoardState,
    updateBoardState,
  };
};
