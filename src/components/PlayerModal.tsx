/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Player } from '../types/player';

interface Props {
  isPlayerModalOpen: boolean;
  closePlayerModal: () => void;
  playerFirst: Player;
  playerSecond: Player;
  updateSessionPlayerSetting: (key: 'name' | 'color', first: string, second: string) => void;
  updatePlayerSetting: (key: 'name' | 'color', first: string, second: string) => void;
}

export const PlayerModal: VFC<Props> = (props) => {
  const { isPlayerModalOpen, closePlayerModal, playerFirst, playerSecond, updateSessionPlayerSetting, updatePlayerSetting } = props;

  const [playerFirstName, setPlayerFirstName] = useState('');
  const [playerSecondName, setPlayerSecondName] = useState('');

  useEffect(() => {
    setPlayerFirstName(playerFirst.name ?? '');
    setPlayerSecondName(playerSecond.name ?? '');
  }, [playerFirst, playerSecond, isPlayerModalOpen]);

  const onChangePlayerFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerFirstName(e.target.value);
  };

  const onChangePlayerSecondName = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerSecondName(e.target.value);
  };

  const onClickUpdate = () => {
    updateSessionPlayerSetting('name', playerFirstName, playerSecondName);
    updatePlayerSetting('name', playerFirstName, playerSecondName);
    closePlayerModal();
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isPlayerModalOpen && (
        <div css={overlay} onClick={closePlayerModal}>
          <div css={modal} onClick={(e) => e.stopPropagation()}>
            <div css={header}>
              <p css={title}>プレイヤー名を変更する</p>
            </div>
            <div css={content}>
              <div css={formParts}>
                <label htmlFor="playerFirst" css={label}>
                  先手プレイヤー
                </label>
                <input id="playerFirst" type="text" css={input} maxLength={10} autoComplete="off" value={playerFirstName} onChange={onChangePlayerFirstName} />
                <p css={counter}>{playerFirstName.length}/10</p>
              </div>
              <div css={formParts}>
                <label htmlFor="playerSecond" css={label}>
                  後手プレイヤー
                </label>
                <input id="playerSecond" type="text" css={input} maxLength={10} autoComplete="off" value={playerSecondName} onChange={onChangePlayerSecondName} />
                <p css={counter}>{playerSecondName.length}/10</p>
              </div>
              <p css={note}>※プレイヤー名は、ブラウザに一時的に保存します。ブラウザを閉じるとリセットされます。</p>
            </div>
            <div css={footer}>
              <button type="button" css={cancelButton} onClick={closePlayerModal}>
                キャンセル
              </button>
              <button type="button" css={updateButton} onClick={onClickUpdate}>
                変更する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const modal = css`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 400px;
  max-height: calc(100vh - 40px);
  border-radius: 4px;
  overflow: hidden;
`;

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
`;

const content = css`
  padding: 24px 20px;
  background-color: #fff;
  overflow-y: auto;
`;

const title = css`
  font-size: 20px;
`;

const formParts = css`
  margin-bottom: 16px;
`;

const label = css`
  display: block;
  margin-bottom: 2px;
  color: #6b655f;
  font-weight: 700;
  font-size: 15px;
`;

const input = css`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  padding: 0 16px;
  background-color: #fff;
  border: 1px solid #dadada;
  font-size: 16px;
`;

const counter = css`
  margin-top: 4px;
  font-size: 14px;
  text-align: right;
`;

const note = css`
  padding-left: 1em;
  font-size: 14px;
  letter-spacing: 0.03em;
  text-indent: -1em;
`;

const footer = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #dbdbdb;
`;

const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  padding: 4px 10px;
  margin-top: 4px;
  margin-bottom: 4px;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 200ms;
`;

const cancelButton = css`
  ${button}
  margin-right: 8px;
  background-color: #fff;
  border: 1px solid #ececec;
  &:hover {
    background-color: #fafafa;
  }
`;

const updateButton = css`
  ${button}
  background-color: #333;
  border-color: transparent;
  color: #fff;
  &:hover {
    background-color: #222;
  }
`;
