import { VFC } from 'react';
import { css } from '@emotion/react';

interface Props {
  htmlId: string;
  title: string;
}

export const ModalHeader: VFC<Props> = (props) => {
  const { htmlId, title } = props;

  return (
    <div css={header}>
      <p id={htmlId} css={headerTitle}>
        {title}
      </p>
    </div>
  );
};

const header = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  background-color: #fff;
  border-bottom: 1px solid #dbdbdb;
`;

const headerTitle = css`
  font-size: 20px;
`;
