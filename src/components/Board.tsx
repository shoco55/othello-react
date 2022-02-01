import { VFC } from 'react';
import { css } from '@emotion/react';

import { BoardSquare } from './BoardSquare';
import { BoardMessage } from './BoardMessage';
import { ResultMessage } from './ResultMessage';

import { Theme } from '../types/theme';
import { Player } from '../types/player';
import { Result } from '../types/result';
import { BoardState, BoardMessageTypeList } from '../types/board';

interface Props {
  selectedTheme: Theme;
  playerFirst: Player;
  playerSecond: Player;
  currentPlayer: Player;
  boardState: BoardState;
  onClickSquare: (x: number, y: number) => void;
  isBoardMessageShow: boolean;
  boardMessageType: BoardMessageTypeList;
  gameResult: Result;
  isResultMessageShow: boolean;
  hideResultMessage: () => void;
}

export const Board: VFC<Props> = (props) => {
  const { selectedTheme, playerFirst, playerSecond, currentPlayer, boardState, onClickSquare, isBoardMessageShow, boardMessageType, gameResult, isResultMessageShow, hideResultMessage } = props;

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
                  onClickSquare={onClickSquare}
                  borderColor={selectedTheme.border}
                  playerFirst={playerFirst}
                  playerSecond={playerSecond}
                />
              );
            });
          })}
        </div>
      </div>
      <BoardMessage currentPlayer={currentPlayer} isBoardMessageShow={isBoardMessageShow} boardMessageType={boardMessageType} />
      <ResultMessage playerFirst={playerFirst} playerSecond={playerSecond} gameResult={gameResult} isResultMessageShow={isResultMessageShow} hideResultMessage={hideResultMessage} />
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
