export type ResultStatus = 'resultFirstWin' | 'resultSecondWin' | 'resultDraw';

export interface Result {
  status: ResultStatus;
  firstStoneNumber: number;
  secondStoneNumber: number;
}
