import { VFC } from 'react';
import { css } from '@emotion/react';

import { BoardSquare } from 'components/features/Board/BoardSquare';
import { BoardMessage } from 'components/features/Board/BoardMessage';
import { ResultMessage } from 'components/features/Board/ResultMessage';

import { Theme } from 'types/theme';
import { Players, Player } from 'types/player';
import { GameResult } from 'types/game';
import { BoardState, BoardMessageTypeList } from 'types/board';

interface Props {
  selectedTheme: Theme;
  players: Players;
  currentPlayer: Player;
  boardState: BoardState;
  updateBoardState: (x: number, y: number) => void;
  isBoardMessageShow: boolean;
  boardMessageType: BoardMessageTypeList;
  gameResult: GameResult;
  isResultMessageShow: boolean;
  hideResultMessage: () => void;
}

export const Board: VFC<Props> = (props) => {
  const {
    selectedTheme,
    players,
    currentPlayer,
    boardState,
    updateBoardState,
    isBoardMessageShow,
    boardMessageType,
    gameResult,
    isResultMessageShow,
    hideResultMessage,
  } = props;

  return (
    <div css={boardContainer}>
      <div css={board} style={{ backgroundColor: selectedTheme.board, borderColor: selectedTheme.border }}>
        <div css={boardInner} style={{ backgroundColor: selectedTheme.board, borderColor: selectedTheme.border }}>
          {boardState.map((squareRow, rowIndex) => {
            return squareRow.map((square, index) => {
              return (
                <BoardSquare
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  squareState={square}
                  x={index}
                  y={rowIndex}
                  updateBoardState={updateBoardState}
                  borderColor={selectedTheme.border}
                  players={players}
                />
              );
            });
          })}
        </div>
      </div>

      <BoardMessage
        currentPlayer={currentPlayer}
        isBoardMessageShow={isBoardMessageShow}
        boardMessageType={boardMessageType}
      />

      <ResultMessage
        players={players}
        gameResult={gameResult}
        isResultMessageShow={isResultMessageShow}
        hideResultMessage={hideResultMessage}
      />
    </div>
  );
};

const boardContainer = css`
  position: relative;
`;

const board = css`
  width: 500px;
  height: 500px;
  margin: 20px auto 0;
  padding: 16px;
  border: 8px solid;
  @media (max-width: 600px) {
    width: 90vw;
    height: 90vw;
    padding: 8px;
    border-width: 6px;
  }
`;

const boardInner = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  border: 1px solid;
`;
