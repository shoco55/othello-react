import { VFC } from 'react';
import { css } from '@emotion/react';

import { Player } from '../types/player';

import { STONE_FIRST } from '../constants';

interface Props {
  squareState: number;
  playerFirst: Player;
  playerSecond: Player;
}

export const BoardStone: VFC<Props> = (props) => {
  const { squareState, playerFirst, playerSecond } = props;

  return (
    <span
      css={stone}
      style={{
        backgroundColor: squareState === STONE_FIRST ? playerFirst.color : playerSecond.color,
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
