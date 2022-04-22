import { useState, useEffect, VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Modal } from 'components/cummon/Modal/Modal';
import { ModalHeader } from 'components/cummon/Modal/ModalHeader';
import { ModalContent } from 'components/cummon/Modal/ModalContent';
import { ModalFooter } from 'components/cummon/Modal/ModalFooter';
import { Button } from 'components/cummon/Button/Button';

import { Player } from 'types/player';

interface Props {
  isPlayerModalOpen: boolean;
  closePlayerModal: () => void;
  playerFirst: Player;
  playerSecond: Player;
  updateSessionPlayerSetting: (key: 'name' | 'color', first: string, second: string) => void;
  updatePlayerSetting: (key: 'name' | 'color', first: string, second: string) => void;
}

export const PlayerModal: VFC<Props> = (props) => {
  const {
    isPlayerModalOpen,
    closePlayerModal,
    playerFirst,
    playerSecond,
    updateSessionPlayerSetting,
    updatePlayerSetting,
  } = props;

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
    <Modal
      isOpen={isPlayerModalOpen}
      aria-labelledby="modalTitle"
      aria-describedby="modalDisc"
      onClose={closePlayerModal}>
      <>
        <ModalHeader htmlId="modalTitle" title="プレイヤー名を変更する" />

        <ModalContent htmlId="modalDisc">
          <div css={formParts}>
            <label htmlFor="playerFirst" css={label}>
              先手プレイヤー
            </label>
            <input
              id="playerFirst"
              type="text"
              css={input}
              maxLength={10}
              autoComplete="off"
              value={playerFirstName}
              onChange={onChangePlayerFirstName}
            />
            <p css={counter}>{playerFirstName.length}/10</p>
          </div>
          <div css={formParts}>
            <label htmlFor="playerSecond" css={label}>
              後手プレイヤー
            </label>
            <input
              id="playerSecond"
              type="text"
              css={input}
              maxLength={10}
              autoComplete="off"
              value={playerSecondName}
              onChange={onChangePlayerSecondName}
            />
            <p css={counter}>{playerSecondName.length}/10</p>
          </div>
          <p css={note}>※プレイヤー名は、ブラウザに一時的に保存します。ブラウザを閉じるとリセットされます。</p>
        </ModalContent>

        <ModalFooter>
          <Button type="normal" onClick={closePlayerModal}>
            キャンセル
          </Button>
          <Button type="primary" onClick={onClickUpdate}>
            変更する
          </Button>
        </ModalFooter>
      </>
    </Modal>
  );
};

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
