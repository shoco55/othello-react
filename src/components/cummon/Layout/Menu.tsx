import { VFC } from 'react';
import { css } from '@emotion/react';

import { Button } from 'components/cummon/Button/Button';

interface Props {
  resetGame: () => void;
  openPlayerModal: () => void;
  openThemeModal: () => void;
}

export const Menu: VFC<Props> = (props) => {
  const { resetGame, openPlayerModal, openThemeModal } = props;

  return (
    <div css={menu}>
      <Button type="normal" iconName="history" onClick={resetGame}>
        リセット
      </Button>
      <div css={settingButtons}>
        <Button type="light" iconName="users-alt" onClick={openPlayerModal}>
          プレイヤー名
        </Button>
        <Button type="light" iconName="palette" onClick={openThemeModal}>
          テーマ
        </Button>
      </div>
    </div>
  );
};

const menu = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 500px;
  max-width: 100%;
  margin: 0 auto 8px;
`;

const settingButtons = css`
  display: flex;

  button + button {
    margin-left: 8px;
  }
`;
