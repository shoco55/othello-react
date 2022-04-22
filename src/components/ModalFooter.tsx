import { VFC } from 'react';
import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
}

export const ModalFooter: VFC<Props> = (props) => {
  const { children } = props;

  return <div css={footer}>{children}</div>;
};

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
