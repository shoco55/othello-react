import { VFC } from 'react';
import { css } from '@emotion/react';

interface Props {
  children: string;
  type: 'primary' | 'light' | 'normal';
  iconName?: string;
  onClick: () => void;
}

export const Button: VFC<Props> = (props) => {
  const { children, type, iconName, onClick } = props;

  return (
    <button type="button" css={[button, buttonStyles[type]]} onClick={onClick}>
      {iconName && <i className={`uil uil-${iconName}`} css={[icon, iconStyles[type]]} />}
      {children}
    </button>
  );
};

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

const buttonStyles = {
  primary: css`
    background-color: #333;
    border-color: transparent;
    color: #fff;

    &:hover {
      background-color: #222;
    }
  `,
  light: css`
    background-color: #ededed;
    border: 1px solid #ededed;

    &:hover {
      background-color: #e4e4e4;
    }
  `,
  normal: css`
    background-color: #fff;
    border: 1px solid #ececec;

    &:hover {
      background-color: #fafafa;
    }
  `,
};

const icon = css`
  margin-right: 4px;
  font-size: 20px;
`;

const iconStyles = {
  primary: css`
    color: #fff;
  `,
  light: css`
    color: #666;
  `,
  normal: css`
    color: #5b5f61;
  `,
};
