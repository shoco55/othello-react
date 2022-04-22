import { VFC, useRef } from 'react';
import { css } from '@emotion/react';
import { CSSTransition } from 'react-transition-group';

import { Player } from 'types/player';
import { BoardMessageTypeList } from 'types/board';

interface Props {
  currentPlayer: Player;
  isBoardMessageShow: boolean;
  boardMessageType: BoardMessageTypeList;
}

export const BoardMessage: VFC<Props> = (props) => {
  const { currentPlayer, isBoardMessageShow, boardMessageType } = props;

  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={isBoardMessageShow}
      nodeRef={nodeRef}
      timeout={200}
      classNames="react-transition-group"
      unmountOnExit>
      <div css={boardMessage} ref={nodeRef}>
        <p css={player}>
          <span css={stone} style={{ backgroundColor: currentPlayer.color }} />
          {currentPlayer.name}
          {boardMessageType === 'start' && <span css={sub}>から</span>}
        </p>
        <p>{boardMessageType === 'start' ? 'スタート!!' : 'パス!'}</p>
      </div>
    </CSSTransition>
  );
};

const boardMessage = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  max-width: 94%;
  padding: 24px 8px;
  background-color: rgba(255, 255, 255, 0.95);
  border: 3px solid rgba(198, 196, 196, 0.9);
  border-radius: 3px;
  color: #555;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.6;
  &.react-transition-group-enter {
    opacity: 0;
  }
  &.react-transition-group-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  &.react-transition-group-exit {
    opacity: 1;
  }
  &.react-transition-group-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

const player = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

const stone = css`
  display: block;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 50%;
  box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.1) inset;
`;

const sub = css`
  margin-left: 4px;
  font-size: 0.8em;
`;
