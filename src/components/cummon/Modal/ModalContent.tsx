import { ReactNode, VFC } from 'react';
import { css } from '@emotion/react';

interface Props {
  children: ReactNode;
  htmlId: string;
}

export const ModalContent: VFC<Props> = (props) => {
  const { children, htmlId } = props;

  return (
    <div id={htmlId} css={content}>
      {children}
    </div>
  );
};

const content = css`
  padding: 24px 20px;
  background-color: #fff;
  overflow-y: auto;
`;
