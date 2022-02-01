import { useState } from 'react';

export const useIsThemeModalOpen = () => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const openThemeModal = () => {
    setIsThemeModalOpen(true);
  };

  const closeThemeModal = () => {
    setIsThemeModalOpen(false);
  };

  return { isThemeModalOpen, openThemeModal, closeThemeModal };
};
