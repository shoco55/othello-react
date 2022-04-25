export interface GameState {
  passedFlag: boolean;
  isGameOver: boolean;
}

export type ResultStatus = 'resultFirstWin' | 'resultSecondWin' | 'resultDraw';

export interface GameResult {
  status: ResultStatus;
  firstStoneNumber: number;
  secondStoneNumber: number;
}
