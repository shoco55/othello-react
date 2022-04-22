import { VFC } from 'react';
import { css } from '@emotion/react';

export const Header: VFC = () => {
  return (
    <div css={header}>
      <h1 css={title}>
        Othello <span css={by}>by shoco55</span>
      </h1>
    </div>
  );
};

const header = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 2px 20px;
  background-color: #222;
`;

const title = css`
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const by = css`
  margin-left: 4px;
  font-size: 15px;
  font-weight: 400;
`;
