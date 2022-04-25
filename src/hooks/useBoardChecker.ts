import { BoardState, BoardArray } from 'types/board';
import { Players, Player } from 'types/player';

import { BOARD_SIZE, STONE_EMPTY } from 'constants';

export const useBoardChecker = (boardState: BoardState, players: Players, currentPlayer: Player) => {
  const isBoardFull = () => {
    const hasNoEmpty = boardState.every((row) => row.every((state) => state !== STONE_EMPTY));
    return hasNoEmpty;
  };

  const hasBoardOnlyOneColor = () => {
    const hasFirstStone = boardState.some((row) => row.some((state) => state === players.first.stone));
    const hasSecondStone = boardState.some((row) => row.some((state) => state === players.second.stone));
    return !hasFirstStone || !hasSecondStone;
  };

  const canPlaceStone = () => {
    const STONE_CURRENT_PLAYER = currentPlayer.stone;
    const STONE_OPPONENT_PLAYER =
      STONE_CURRENT_PLAYER === players.first.stone ? players.second.stone : players.first.stone;

    // playerFirstのターン: (0)(2 が1回以上)(1) or (1)(2 が1回以上)(0)
    // playerSecondのターン: (0)(1 が1回以上)(2) or (2)(1 が1回以上)(0)
    const reverseCheckRegExp = new RegExp(
      `(${STONE_EMPTY}(${STONE_OPPONENT_PLAYER})+(${STONE_CURRENT_PLAYER})|(${STONE_CURRENT_PLAYER})(${STONE_OPPONENT_PLAYER})+${STONE_EMPTY})`
    );

    const canReverseStones = (board: BoardState) => {
      return board.some((array) => {
        return reverseCheckRegExp.test(array.join(''));
      });
    };

    // 横
    if (canReverseStones(boardState)) return true;

    // 縦
    const boardVertical: BoardState = [];

    for (let x = 0; x < BOARD_SIZE; x++) {
      const verticalArray: BoardArray = [];
      for (let y = 0; y < BOARD_SIZE; y++) {
        verticalArray.push(boardState[y][x]);
      }
      boardVertical.push(verticalArray);
    }

    if (canReverseStones(boardVertical)) return true;

    // 斜め
    const boardDiagonal: BoardState = [];

    const MIN_ARRAY_LENGTH = 3;
    const MAX_DIAGONAL_LENGTH = BOARD_SIZE - MIN_ARRAY_LENGTH;

    // 対角線（左上→右下）上部
    for (let i = MAX_DIAGONAL_LENGTH; i >= 1; i--) {
      const diagonalUpperLeftUpperArray: BoardArray = [];

      for (let x = i, y = 0; x < BOARD_SIZE; x++, y++) {
        diagonalUpperLeftUpperArray.push(boardState[y][x]);
      }

      boardDiagonal.push(diagonalUpperLeftUpperArray);
    }

    // 対角線（左上→右下）
    const diagonalUpperLeftArray: BoardArray = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      diagonalUpperLeftArray.push(boardState[i][i]);
    }
    boardDiagonal.push(diagonalUpperLeftArray);

    // 対角線（左上→右下）下部
    for (let i = 1; i <= MAX_DIAGONAL_LENGTH; i++) {
      const diagonalUpperLeftLowerArray: BoardArray = [];

      for (let x = 0, y = i; y < BOARD_SIZE; x++, y++) {
        diagonalUpperLeftLowerArray.push(boardState[y][x]);
      }

      boardDiagonal.push(diagonalUpperLeftLowerArray);
    }

    // 対角線（右上→左下）上部
    for (let i = MIN_ARRAY_LENGTH - 1; i < BOARD_SIZE - 1; i++) {
      const diagonalUpperRightUpperArray: BoardArray = [];

      for (let x = i, y = 0; x >= 0; x--, y++) {
        diagonalUpperRightUpperArray.push(boardState[y][x]);
      }

      boardDiagonal.push(diagonalUpperRightUpperArray);
    }

    // 対角線（右上→左下）
    const diagonalUpperRightArray: BoardArray = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      diagonalUpperRightArray.push(boardState[i][BOARD_SIZE - 1 - i]);
    }
    boardDiagonal.push(diagonalUpperRightArray);

    // 対角線（右上→左下）下部
    for (let i = 1; i <= MAX_DIAGONAL_LENGTH; i++) {
      const diagonalUpperRightLowerArray: BoardArray = [];

      for (let x = 7, y = i; y < BOARD_SIZE; x--, y++) {
        diagonalUpperRightLowerArray.push(boardState[y][x]);
      }

      boardDiagonal.push(diagonalUpperRightLowerArray);
    }

    if (canReverseStones(boardDiagonal)) return true;

    return false;
  };

  return { isBoardFull, hasBoardOnlyOneColor, canPlaceStone };
};
