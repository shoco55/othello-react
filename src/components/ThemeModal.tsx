/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect, VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Button } from './Button';

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
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isThemeModalOpen && (
        <div css={overlay} onClick={closeThemeModal}>
          <div css={modal} onClick={(e) => e.stopPropagation()}>
            <div css={header}>
              <p css={title}>テーマを変更する</p>
            </div>

            <section css={content}>
              <div css={themes}>
                {THEME_COLORS.map((theme, id) => (
                  <label
                    // eslint-disable-next-line react/no-array-index-key
                    key={id}
                    css={theme.id === selectedThemeRadio?.id ? checkedThemeBox : themeBox}>
                    <div css={board} style={{ backgroundColor: theme.board, borderColor: theme.border }}>
                      <div css={boardInner} style={{ borderColor: theme.border }}>
                        <div css={square} style={{ borderColor: theme.border }}>
                          <span css={stone} style={{ backgroundColor: theme.second }} />
                        </div>
                        <div css={square} style={{ borderColor: theme.border }}>
                          <span css={stone} style={{ backgroundColor: theme.first }} />
                        </div>
                        <div css={square} style={{ borderColor: theme.border }}>
                          <span css={stone} style={{ backgroundColor: theme.first }} />
                        </div>
                        <div css={square} style={{ borderColor: theme.border }}>
                          <span css={stone} style={{ backgroundColor: theme.second }} />
                        </div>
                      </div>
                    </div>
                    <div css={theme.id === selectedThemeRadio?.id ? checkedThemeName : themeName}>
                      <div css={themeNameInner}>
                        <input
                          type="radio"
                          name="theme"
                          css={radioSubstance}
                          value={theme.id}
                          checked={theme.id === selectedThemeRadio?.id}
                          onChange={onChangeTheme}
                        />
                        <span css={radioImitation} />
                        <p css={themeNameTitle}>{theme.name}</p>
                      </div>
                    </div>
                  </label>
                ))}
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

const themeBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition-property: box-shadow, border;
  transition-duration: 300ms;
  transition-timing-function: ease;
  overflow: hidden;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 1px 8px 0 rgb(0 0 0 / 8%);
  }
`;

const checkedThemeBox = css`
  ${themeBox}
  border-color: #223a70;
`;

const board = css`
  width: 120px;
  height: 120px;
  margin: 8px auto;
  padding: 6px;
  border: 4px solid;
`;

const boardInner = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  border: 1px solid;
`;

const square = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(100% / 2);
  height: calc(100% / 2);
  padding: 0;
  background-color: transparent;
  border: 1px solid;
`;

const stone = css`
  display: block;
  flex-shrink: 0;
  width: 70%;
  height: 70%;
  border-radius: 50%;
`;

const themeName = css`
  flex-grow: 1;
  width: 100%;
  background-color: #f3f3f3;
  letter-spacing: 0.01em;
`;

const checkedThemeName = css`
  ${themeName}
  background-color: rgba(34, 58, 112, 0.1);
`;

const themeNameInner = css`
  display: flex;
  align-items: center;
  width: 120px;
  margin: 0 auto;
  padding: 6px 0;
`;

const radioSubstance = css`
  position: absolute;
  opacity: 0;
  left: 0;
  width: 14px;
  height: 14px;
  margin: 0;
  appearance: none;
  z-index: 2;
  &:focus {
    opacity: 1;
  }
  &:checked + span {
    border-color: #223a70;
    &::after {
      opacity: 1;
    }
  }
`;

const radioImitation = css`
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 14px;
  height: 14px;
  margin-right: 0.4em;
  border: 1px solid #666;
  border-radius: 50%;
  background-color: #fff;
  transition: all 200ms ease-out;
  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background-color: #223a70;
    border-radius: 50%;
    opacity: 0;
  }
`;

const themeNameTitle = css`
  color: #6b655f;
  font-size: 14px;
  font-weight: 700;
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
