import { useState } from 'react';

export const useIsResultMessageShow = () => {
  const [isResultMessageShow, setIsShowResultMessage] = useState(false);

  const showResultMessage = () => {
    setIsShowResultMessage(true);
  };

  const hideResultMessage = () => {
    setIsShowResultMessage(false);
  };

  return { isResultMessageShow, showResultMessage, hideResultMessage };
};
