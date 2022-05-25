import { VFC, useEffect, useRef } from 'react';

import { MainLayout } from 'layouts/MainLayout';

import { Menu } from 'components/cummon/Layout/Menu';
import { Guide } from 'components/features/Guide/Guide';
import { Board } from 'components/features/Board/Board';
import { PlayerProfile } from 'components/features/Player/PlayerProfile';
import { PlayerModal } from 'components/features/Player/PlayerModal';
import { ThemeModal } from 'components/features/Theme/ThemeModal';

import { useThemes } from 'hooks/useThemes';
import { usePlayers } from 'hooks/usePlayers';
import { useCurrentPlayers } from 'hooks/useCurrentPlayer';
import { useBoardState } from 'hooks/useBoardState';
import { useBoardChecker } from 'hooks/useBoardChecker';
import { useGameState } from 'hooks/useGameState';
import { useGameResult } from 'hooks/useGameResult';
import { useIsThemeModalOpen } from 'hooks/useIsThemeModalOpen';
import { useIsPlayerModalOpen } from 'hooks/useIsPlayerModalOpen';
import { useIsBoardMessageShow } from 'hooks/useIsBoardMessageShow';
import { useIsResultMessageShow } from 'hooks/useIsResultMessageShow';

export const Reversi: VFC = () => {
  const isFirstRender = useRef(false);

  useEffect(() => {
    isFirstRender.current = true;
  }, []);

  const { selectedTheme, updateTheme, updateSessionTheme } = useThemes();

  const { players, updatePlayers, updateSessionPlayers, initializePlayerTurn, changePlayerTurn } =
    usePlayers(selectedTheme);

  const { currentPlayer } = useCurrentPlayers(players);

  const { boardState, isInitialBoardState, initializeBoardState, updateBoardState } = useBoardState(currentPlayer);

  const { isBoardFull, hasBoardOnlyOneColor, canPlaceStone } = useBoardChecker(boardState, players, currentPlayer);

  const { gameState, updatePassedFlag, updateIsGameOver, determineNextTurn } = useGameState(
    isBoardFull,
    hasBoardOnlyOneColor,
    canPlaceStone
  );

  const { gameResult } = useGameResult(boardState, gameState);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      if (isInitialBoardState(boardState)) return;
      changePlayerTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardState]);

  useEffect(
    () => {
      determineNextTurn();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPlayer.stone]
  );

  useEffect(
    () => {
      if (gameState.passedFlag) {
        const duration = 2000;
        showBoardMessage('pass', duration);
        setTimeout(() => {
          changePlayerTurn();
        }, duration + 200); // duration + timeout(<CSSTransition)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.passedFlag]
  );

  const initializeGame = () => {
    initializePlayerTurn();
    initializeBoardState();
    updatePassedFlag(false);

    showBoardMessage('start', 1500);
    updateIsGameOver(false);
  };

  const { isBoardMessageShow, boardMessageType, showBoardMessage } = useIsBoardMessageShow();

  const { isResultMessageShow, hideResultMessage } = useIsResultMessageShow(gameState.isGameOver);

  const { isPlayerModalOpen, openPlayerModal, closePlayerModal } = useIsPlayerModalOpen();

  const { isThemeModalOpen, openThemeModal, closeThemeModal } = useIsThemeModalOpen();

  return (
    <MainLayout>
      <Menu initializeGame={initializeGame} openPlayerModal={openPlayerModal} openThemeModal={openThemeModal} />

      <Guide currentPlayer={currentPlayer} isGameOver={gameState.isGameOver} />

      <Board
        selectedTheme={selectedTheme}
        players={players}
        currentPlayer={currentPlayer}
        boardState={boardState}
        updateBoardState={updateBoardState}
        isBoardMessageShow={isBoardMessageShow}
        boardMessageType={boardMessageType}
        gameResult={gameResult}
        isResultMessageShow={isResultMessageShow}
        hideResultMessage={hideResultMessage}
      />

      <PlayerProfile players={players} />

      <PlayerModal
        isPlayerModalOpen={isPlayerModalOpen}
        closePlayerModal={closePlayerModal}
        players={players}
        updatePlayers={updatePlayers}
        updateSessionPlayers={updateSessionPlayers}
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
