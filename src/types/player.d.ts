import { BoardStoneType } from 'types/board';

export interface Player {
  name: string;
  stone: BoardStoneType;
  color: string;
  isMyTurn: boolean;
}

export interface Players {
  first: Player;
  second: Player;
}
