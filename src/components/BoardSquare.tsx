import { VFC } from 'react';
import { css } from '@emotion/react';
import { BoardStone } from './BoardStone';

import { Player } from '../types/player';

import { STONE_EMPTY } from '../constants';

interface Props {
  squareState: number;
  x: number;
  y: number;
  onClickSquare: (x: number, y: number) => void;
  borderColor: string;
  playerFirst: Player;
  playerSecond: Player;
};

export const BoardSquare: VFC<Props> = (props) => {
  const { squareState, x, y, onClickSquare, borderColor, playerFirst, playerSecond } = props;

  return (
    <button type="button" css={square} style={{ borderColor }} onClick={() => onClickSquare(x, y)}>
      {squareState !== STONE_EMPTY && (
        <BoardStone
          squareState={squareState}
          playerFirst={playerFirst}
          playerSecond={playerSecond}
        />
      )}
    </button>
  );
};

const square = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 8);
  height: calc(100% / 8);
  padding: 0;
  background-color: transparent;
  border: 1px solid;
`;
