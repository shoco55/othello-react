import { ReactNode, VFC } from 'react';
import { css } from '@emotion/react';

import { Header } from 'components/cummon/Layout/Header';

const main = css`
  padding: 20px 16px;
`;

type Props = {
  children: ReactNode;
};

export const MainLayout: VFC<Props> = (props) => {
  const { children } = props;
  return (
    <div>
      <Header />
      <main css={main}>{children}</main>
    </div>
  );
};
