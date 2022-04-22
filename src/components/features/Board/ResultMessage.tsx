import { VFC, useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { CSSTransition } from 'react-transition-group';

import { Player } from 'types/player';
import { Result } from 'types/result';

import { RESULT_FIRST_WIN, RESULT_SECOND_WIN, RESULT_DRAW } from '../../../constants';

interface Props {
  playerFirst: Player;
  playerSecond: Player;
  gameResult: Result;
  isResultMessageShow: boolean;
  hideResultMessage: () => void;
}

export const ResultMessage: VFC<Props> = (props) => {
  const { playerFirst, playerSecond, gameResult, isResultMessageShow, hideResultMessage } = props;

  const nodeRef = useRef(null);

  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    // eslint-disable-next-line default-case
    switch (gameResult.status) {
      case RESULT_FIRST_WIN:
        setResultMessage(playerFirst.name);
        break;
      case RESULT_SECOND_WIN:
        setResultMessage(playerSecond.name);
        break;
      case RESULT_DRAW:
        setResultMessage('引き分け');
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameResult]);

  return (
    <CSSTransition
      in={isResultMessageShow}
      nodeRef={nodeRef}
      timeout={200}
      classNames="react-transition-group"
      unmountOnExit>
      <div css={boardMessage} ref={nodeRef}>
        <button type="button" aria-label="閉じる" css={closeButton} onClick={hideResultMessage} />
        {gameResult.status !== RESULT_DRAW ? (
          <p>
            <i className="uil uil-favorite" css={star} />
            <span css={winner}>WINNER</span>
            <i className="uil uil-favorite" css={star} />
          </p>
        ) : (
          <p>
            <i className="uil uil-bolt-alt" css={bolt} />
            <span css={draw}>DRAW</span>
            <i className="uil uil-bolt-alt" css={bolt} />
          </p>
        )}
        <p css={result}>{resultMessage}</p>
        <div css={players}>
          <p css={player}>
            <span css={stone} style={{ backgroundColor: playerFirst.color }} />
            <span css={number}>{gameResult.firstStoneNumber}</span>
          </p>
          <p css={vs}>VS</p>
          <p css={player}>
            <span css={number}>{gameResult.secondStoneNumber}</span>
            <span css={stone} style={{ backgroundColor: playerSecond.color }} />
          </p>
        </div>
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
  width: 300px;
  max-width: 94%;
  padding: 32px 8px;
  background-color: rgba(255, 255, 255, 1);
  border: 3px solid rgba(193, 171, 5, 0.4);
  border-radius: 3px;
  color: #555;
  font-size: 20px;
  font-weight: 700;
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

const closeButton = css`
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 2px;
    border-radius: 16px;
    background: #777;
  }
  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const star = css`
  margin: 0 4px;
  color: #c1ab05;
  font-size: 18px;
`;

const winner = css`
  color: #c1ab05;
  font-size: 17px;
  font-weight: 700;
`;

const draw = css`
  margin: 0 4px;
  color: #777;
  font-size: 17px;
`;

const bolt = css`
  color: #777;
  font-size: 15px;
  font-weight: 700;
`;

const result = css`
  margin-top: 4px;
  color: #444;
  font-size: 26px;
  text-align: center;
`;

const players = css`
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
`;

const vs = css`
  margin: 0 4px;
  font-size: 16px;
  font-weight: 700;
  opacity: 0.8;
`;

const number = css`
  font-size: 22px;
  font-weight: 700;
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
