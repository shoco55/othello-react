import { VFC } from 'react';
import { css } from '@emotion/react';

import { BoardStoneType } from 'types/board';
import { Players } from 'types/player';

import { STONE_FIRST } from 'constants';

interface Props {
  squareState: BoardStoneType;
  players: Players;
}

export const BoardStone: VFC<Props> = (props) => {
  const { squareState, players } = props;

  return (
    <span
      css={stone}
      style={{
        backgroundColor: squareState === STONE_FIRST ? players.first.color : players.second.color,
      }}
    />
  );
};

const stone = css`
  display: block;
  flex-shrink: 0;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1) inset;
`;
