import { useState } from 'react';

export const useIsPlayerModalOpen = () => {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);

  const openPlayerModal = () => {
    setIsPlayerModalOpen(true);
  };

  const closePlayerModal = () => {
    setIsPlayerModalOpen(false);
  };

  return { isPlayerModalOpen, openPlayerModal, closePlayerModal };
};
