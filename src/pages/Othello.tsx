import { VFC, useState, useEffect } from 'react';

import { MainLayout } from '../layouts/MainLayout';

import { Menu } from '../components/Menu';
import { Guide } from '../components/Guide';
import { Board } from '../components/Board';
import { PlayerProfile } from '../components/PlayerProfile';
import { PlayerModal } from '../components/PlayerModal';
import { ThemeModal } from '../components/ThemeModal';

import { INITIAL_BOARD_STATE, THEME_COLORS, PLAYER_FIRST_DEFAULT_NAME, PLAYER_SECOND_DEFAULT_NAME } from '../constants';

import { useIsThemeModalOpen } from '../hooks/useIsThemeModalOpen';
import { useIsPlayerModalOpen } from '../hooks/useIsPlayerModalOpen';
import { useIsBoardMessageShow } from '../hooks/useIsBoardMessageShow';
import { useIsResultMessageShow } from '../hooks/useIsResultMessageShow';
import { useBoardState } from '../hooks/useBoardState';
import { usePlayers } from '../hooks/usePlayers';
import { useThemes } from '../hooks/useThemes';
import { useBoardChecker } from '../hooks/useBoardChecker';
import { useCurrentPlayer } from '../hooks/useCurrentPlayer';
import { useGameResult } from '../hooks/useGameResult';

export const Othello: VFC = () => {
  const { selectedTheme, updateSessionTheme, updateTheme } = useThemes();

  const {
    playerFirst,
    setPlayerFirst,
    playerSecond,
    setPlayerSecond,
    updateSessionPlayerSetting,
    updatePlayerSetting,
  } = usePlayers(selectedTheme);

  useEffect(() => {
    const sessionPlayerFirstName = sessionStorage.getItem('playerFirstName');
    const playerFirstName = sessionPlayerFirstName != null ? sessionPlayerFirstName : PLAYER_FIRST_DEFAULT_NAME;
    const sessionPlayerSecondName = sessionStorage.getItem('playerSecondName');
    const playerSecondName = sessionPlayerSecondName != null ? sessionPlayerSecondName : PLAYER_SECOND_DEFAULT_NAME;
    updatePlayerSetting('name', playerFirstName, playerSecondName);

    const sessionThemeId = sessionStorage.getItem('theme');
    if (sessionThemeId == null) return;
    const theme = THEME_COLORS.find((themeColor) => themeColor.id === Number(sessionThemeId));
    updateTheme(theme || THEME_COLORS[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPlayerFirst((state) => ({ ...state, color: selectedTheme.first }));
    setPlayerSecond((state) => ({ ...state, color: selectedTheme.second }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);

  useEffect(() => {
    updateCurrentPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerFirst, playerSecond]);

  const { currentPlayer, updateCurrentPlayer, changePlayerTurn, resetPlayerTurn } = useCurrentPlayer(
    playerFirst,
    playerSecond
  );

  const { boardState, updateBoardState, currentPosition, updateCurrentPosition, nextBoardState } =
    useBoardState(currentPlayer);

  const onClickSquare = (x: number, y: number) => {
    updateCurrentPosition({ x, y });
  };

  useEffect(() => {
    const nextBoard = nextBoardState();
    if (JSON.stringify(nextBoard) === JSON.stringify(boardState)) return;

    const { x, y } = currentPosition;
    nextBoard[y][x] = currentPlayer.stone;
    updateBoardState(nextBoard);

    changePlayerTurn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition]);

  const { isBoardFull, hasBoardOnlyOneColor, canPlaceStone } = useBoardChecker(
    boardState,
    playerFirst,
    playerSecond,
    currentPlayer
  );

  const [passedFlag, setPassedFlag] = useState(false);

  const setNextTurn = () => {
    if ((!passedFlag && isBoardFull()) || hasBoardOnlyOneColor()) {
      endGame();
      return;
    }

    if (!canPlaceStone()) {
      if (passedFlag) {
        endGame();
      } else {
        setPassedFlag(true);

        const duration = 2000;
        showBoardMessage('pass', duration);
        setTimeout(() => {
          changePlayerTurn();
        }, duration);

        return;
      }
    }

    setPassedFlag(false);
  };

  const { gameResult, isGameOver, updateIsGameOver, endGame } = useGameResult(boardState);

  useEffect(
    setNextTurn,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPlayer.stone]
  );

  useEffect(
    () => {
      if (isGameOver) showResultMessage();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isGameOver]
  );

  const { isBoardMessageShow, boardMessageType, showBoardMessage } = useIsBoardMessageShow();

  const { isResultMessageShow, showResultMessage, hideResultMessage } = useIsResultMessageShow();

  const { isPlayerModalOpen, openPlayerModal, closePlayerModal } = useIsPlayerModalOpen();

  const { isThemeModalOpen, openThemeModal, closeThemeModal } = useIsThemeModalOpen();

  const resetGame = () => {
    hideResultMessage();
    updateIsGameOver(false);
    updateBoardState(INITIAL_BOARD_STATE);
    resetPlayerTurn();
    setPassedFlag(false);

    showBoardMessage('start', 1500);
  };

  return (
    <MainLayout>
      <Menu resetGame={resetGame} openPlayerModal={openPlayerModal} openThemeModal={openThemeModal} />

      <Guide currentPlayer={currentPlayer} isGameOver={isGameOver} />

      <Board
        selectedTheme={selectedTheme}
        playerFirst={playerFirst}
        playerSecond={playerSecond}
        currentPlayer={currentPlayer}
        boardState={boardState}
        onClickSquare={onClickSquare}
        isBoardMessageShow={isBoardMessageShow}
        boardMessageType={boardMessageType}
        gameResult={gameResult}
        isResultMessageShow={isResultMessageShow}
        hideResultMessage={hideResultMessage}
      />

      <PlayerProfile playerFirst={playerFirst} playerSecond={playerSecond} />

      <PlayerModal
        isPlayerModalOpen={isPlayerModalOpen}
        closePlayerModal={closePlayerModal}
        playerFirst={playerFirst}
        playerSecond={playerSecond}
        updateSessionPlayerSetting={updateSessionPlayerSetting}
        updatePlayerSetting={updatePlayerSetting}
      />

      <ThemeModal
        isThemeModalOpen={isThemeModalOpen}
        closeThemeModal={closeThemeModal}
        selectedTheme={selectedTheme}
        updateSessionTheme={updateSessionTheme}
        updateTheme={updateTheme}
      />
    </MainLayout>
  );
};
