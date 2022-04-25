import { VFC } from 'react';
import { css } from '@emotion/react';

import { BoardStone } from 'components/features/Board/BoardStone';

import { BoardStoneType } from 'types/board';
import { Players } from 'types/player';

import { STONE_EMPTY } from 'constants';

interface Props {
  squareState: BoardStoneType;
  x: number;
  y: number;
  updateBoardState: (x: number, y: number) => void;
  borderColor: string;
  players: Players;
}

export const BoardSquare: VFC<Props> = (props) => {
  const { squareState, x, y, updateBoardState, borderColor, players } = props;

  return (
    <button type="button" css={square} style={{ borderColor }} onClick={() => updateBoardState(x, y)}>
      {squareState !== STONE_EMPTY && <BoardStone squareState={squareState} players={players} />}
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
