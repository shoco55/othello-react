import { useState } from 'react';

import { BoardMessageTypeList } from '../types/board';

export const useIsBoardMessageShow = () => {
  const [isBoardMessageShow, setIsShowBoardMessage] = useState(false);
  const [boardMessageType, setBoardMessageType] = useState<BoardMessageTypeList>('start');

  const showBoardMessage = (type: BoardMessageTypeList, duration: number) => {
    setBoardMessageType(type);
    setIsShowBoardMessage(true);
    setTimeout(() => {
      setIsShowBoardMessage(false);
    }, duration);
  };

  return { isBoardMessageShow, boardMessageType, showBoardMessage };
};
