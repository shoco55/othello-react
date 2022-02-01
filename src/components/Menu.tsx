import { VFC } from 'react';
import { css } from '@emotion/react';

interface Props {
  resetGame: () => void;
  openPlayerModal: () => void;
  openThemeModal: () => void;
}

export const Menu: VFC<Props> = (props) => {
  const { resetGame, openPlayerModal, openThemeModal } = props;

  return (
    <div css={menu}>
      <button type="button" css={resetButton} onClick={resetGame}>
        <i className="uil uil-history" css={resetButtonIcon} />
        リセット
      </button>
      <div css={settingButtons}>
        <button type="button" css={settingButton} onClick={openPlayerModal}>
          <i className="uil uil-users-alt" css={settingButtonIcon} />
          プレイヤー名
        </button>
        <button type="button" css={settingButton} onClick={openThemeModal}>
          <i className="uil uil-palette" css={settingButtonIcon} />
          テーマ
        </button>
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

const buttonIcon = css`
  margin-right: 4px;
  font-size: 20px;
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

const resetButtonIcon = css`
  ${buttonIcon}
  color: #666;
`;

const resetButton = css`
  ${button}
  background-color: #fff;
  border: 1px solid #ececec;
  &:hover {
    background-color: #fafafa;
  }
`;

const settingButtonIcon = css`
  ${buttonIcon}
  color: #5b5f61;
`;

const settingButton = css`
  ${button}

  background-color: #ededed;
  border: 1px solid #ededed;
  &:not(:first-of-type) {
    margin-left: 8px;
  }
  &:hover {
    background-color: #e4e4e4;
  }
`;

const settingButtons = css`
  display: flex;
`;
