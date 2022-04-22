import { RefObject, useEffect } from 'react';
import { createFocusTrap } from 'focus-trap';

type FocusTrapOptions = {
  ref: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
};

export const useFocusTrap = ({ ref, isOpen, onClose }: FocusTrapOptions) => {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return undefined;
    }

    const trap = createFocusTrap(ref.current, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      returnFocusOnDeactivate: true,
      onDeactivate: onClose,
    });
    trap.activate();

    return () => {
      trap.deactivate();
    };
  }, [ref, isOpen, onClose]);
};
