import { VFC } from 'react';
import { css } from '@emotion/react';

import { Players } from 'types/player';

interface Props {
  players: Players;
}

export const PlayerProfile: VFC<Props> = (props) => {
  const { players } = props;

  return (
    <div css={playersProfile}>
      <p css={player}>
        {players.first.name}
        <span css={stone} style={{ backgroundColor: players.first.color }} />
      </p>
      <p css={vs}>VS</p>
      <p css={player}>
        <span css={stone} style={{ backgroundColor: players.second.color }} />
        {players.second.name}
      </p>
    </div>
  );
};

const playersProfile = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

const player = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  line-height: 1.3;
`;

const vs = css`
  margin: 0 4px;
  font-size: 16px;
  font-weight: 700;
  opacity: 0.8;
`;

const stone = css`
  display: block;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin: 0 8px;
  border-radius: 50%;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1) inset;
`;
