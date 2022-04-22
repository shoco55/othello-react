/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Button } from './Button';
import { ThemeSample } from './ThemeSample';

import { Theme } from '../types/theme';

import { THEME_COLORS } from '../constants';

interface Props {
  isThemeModalOpen: boolean;
  closeThemeModal: () => void;
  selectedTheme: Theme;
  updateSessionTheme: (theme: Theme) => void;
  updateTheme: (theme: Theme) => void;
}

export const ThemeModal: VFC<Props> = (props) => {
  const { isThemeModalOpen, closeThemeModal, selectedTheme, updateSessionTheme, updateTheme } = props;

  const [selectedThemeRadio, setSelectedThemeRadio] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    setSelectedThemeRadio(selectedTheme ?? undefined);
  }, [selectedTheme, isThemeModalOpen]);

  const onChangeTheme = (e: ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.value);
    const checkedTheme = THEME_COLORS.find((themeColor) => themeColor.id === id);
    setSelectedThemeRadio(checkedTheme);
  };

  const onClickUpdate = () => {
    if (selectedThemeRadio === undefined) return;
    updateSessionTheme(selectedThemeRadio);
    updateTheme(selectedThemeRadio);
    closeThemeModal();
  };

  return (
    <div>
      {isThemeModalOpen && (
        <div css={overlay} onClick={closeThemeModal}>
          <div css={modal} onClick={(e) => e.stopPropagation()}>
            <div css={header}>
              <p css={title}>テーマを変更する</p>
            </div>

            <section css={content}>
              <div css={themes}>
                {THEME_COLORS.map((theme) => {
                  return (
                    <ThemeSample theme={theme} selectedThemeRadio={selectedThemeRadio} onChangeTheme={onChangeTheme} />
                  );
                })}
              </div>
            </section>

            <div css={footer}>
              <Button type="normal" onClick={closeThemeModal}>
                キャンセル
              </Button>
              <Button type="primary" onClick={onClickUpdate}>
                変更する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
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
  width: 90%;
  max-width: 900px;
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

const title = css`
  font-size: 20px;
`;

const content = css`
  padding: 16px 20px;
  background-color: #fff;
  overflow-y: auto;
`;

const themes = css`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const footer = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #dbdbdb;

  button + button {
    margin-left: 8px;
  }
`;
