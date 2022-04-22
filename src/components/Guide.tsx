import { VFC } from 'react';
import { css } from '@emotion/react';

import { Player } from 'types/player';

interface Props {
  currentPlayer: Player;
  isGameOver: boolean;
}

export const Guide: VFC<Props> = (props) => {
  const { currentPlayer, isGameOver } = props;

  return (
    <p css={guide}>
      {isGameOver ? (
        <span>リセットボタンを押して、ゲームをスタートしてください</span>
      ) : (
        <>
          <span css={stone} style={{ backgroundColor: currentPlayer.color }} />
          <span>{currentPlayer.name} の番です</span>
        </>
      )}
    </p>
  );
};

const guide = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20px;
  margin-top: 24px;
  font-weight: 700;
`;

const stone = css`
  display: block;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 50%;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1) inset;
`;
