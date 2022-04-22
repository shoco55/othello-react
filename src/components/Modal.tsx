import { VFC, useRef } from 'react';
import { css } from '@emotion/react';

import { useAriaHidden } from 'hooks/useAriaHidden';
import { useFocusTrap } from 'hooks/useFocusTrap';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  'aria-labelledby': string;
  'aria-describedby': string;
  onClose: () => void;
  width?: string;
};

export const Modal: VFC<Props> = ({
  children,
  isOpen,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  onClose,
  width = '400px',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useAriaHidden(ref, isOpen);
  useFocusTrap({ ref, isOpen, onClose });

  if (!isOpen) {
    return null;
  }

  return (
    <div css={overlay}>
      <div
        ref={ref}
        role="dialog"
        aria-modal
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        css={[modal, { width }]}>
        {children}
      </div>
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
  max-width: 900px;
  max-height: calc(100vh - 40px);
  border-radius: 4px;
  overflow: hidden;
`;
