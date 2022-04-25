import { useState, useEffect } from 'react';

import { GameState } from 'types/game';

export const useIsResultMessageShow = (isGameOver: GameState['isGameOver']) => {
  const [isResultMessageShow, setIsShowResultMessage] = useState(false);

  const showResultMessage = () => {
    setIsShowResultMessage(true);
  };

  const hideResultMessage = () => {
    setIsShowResultMessage(false);
  };

  useEffect(() => {
    if (isGameOver) {
      showResultMessage();
    } else {
      hideResultMessage();
    }
  }, [isGameOver]);

  return { isResultMessageShow, showResultMessage, hideResultMessage };
};
