import { STONE_EMPTY, STONE_FIRST, STONE_SECOND } from 'constants';

export type BoardStoneType = typeof STONE_EMPTY | typeof STONE_FIRST | typeof STONE_SECOND;

export type BoardState = BoardArray[];

export type BoardArray = BoardStoneType[];

export type BoardMessageTypeList = 'start' | 'pass';
