import { RefObject, useEffect } from 'react';
import { hideOthers } from 'aria-hidden';

export const useAriaHidden = (ref: RefObject<HTMLElement>, isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return undefined;
    }

    return hideOthers(ref.current);
  }, [ref, isOpen]);
};
