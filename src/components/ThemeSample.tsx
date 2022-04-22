import { VFC, ChangeEvent } from 'react';
import { css } from '@emotion/react';

import { Theme } from '../types/theme';

interface Props {
  theme: Theme;
  selectedThemeRadio?: Theme;
  onChangeTheme: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ThemeSample: VFC<Props> = (props) => {
  const { theme, selectedThemeRadio, onChangeTheme } = props;
  const { id, name, board, border, first, second } = theme;

  return (
    <label key={id} css={id === selectedThemeRadio?.id ? checkedThemeBox : themeBox}>
      <div css={sampleBoard} style={{ backgroundColor: board, borderColor: border }}>
        <div css={sampleBoardInner} style={{ borderColor: border }}>
          <div css={square} style={{ borderColor: border }}>
            <span css={stone} style={{ backgroundColor: second }} />
          </div>
          <div css={square} style={{ borderColor: border }}>
            <span css={stone} style={{ backgroundColor: first }} />
          </div>
          <div css={square} style={{ borderColor: border }}>
            <span css={stone} style={{ backgroundColor: first }} />
          </div>
          <div css={square} style={{ borderColor: border }}>
            <span css={stone} style={{ backgroundColor: second }} />
          </div>
        </div>
      </div>
      <div css={id === selectedThemeRadio?.id ? checkedThemeName : themeName}>
        <div css={themeNameInner}>
          <input
            type="radio"
            name="theme"
            css={radioSubstance}
            value={id}
            checked={id === selectedThemeRadio?.id}
            onChange={onChangeTheme}
          />
          <span css={radioImitation} />
          <p css={themeNameTitle}>{name}</p>
        </div>
      </div>
    </label>
  );
};

const themeBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

const sampleBoard = css`
  width: 120px;
  height: 120px;
  margin: 8px auto;
  padding: 6px;
  border: 4px solid;
`;

const sampleBoardInner = css`
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
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  margin: 0;
  appearance: none;
  z-index: 2;

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
