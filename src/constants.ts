import { Theme } from './types/theme';

export const BOARD_SIZE = 8;

export const STONE_FIRST = 1;
export const STONE_SECOND = -1;
export const STONE_EMPTY = 0;

const F = STONE_FIRST;
const S = STONE_SECOND;
const E = STONE_EMPTY;

export const INITIAL_BOARD_STATE = [
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, S, F, E, E, E],
  [E, E, E, F, S, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
];

export const PLAYER_FIRST_DEFAULT_NAME = 'プレイヤーA';
export const PLAYER_SECOND_DEFAULT_NAME = 'プレイヤーB';

export const RESULT_FIRST_WIN = 'resultFirstWin';
export const RESULT_SECOND_WIN = 'resultSecondWin';
export const RESULT_DRAW = 'resultDraw';

export const THEME_COLORS: Theme[] = [
  {
    id: 0,
    name: 'オリジナル',
    board: '#008000',
    border: '#014000',
    first: '#000',
    second: '#fff',
  },
  {
    id: 1,
    name: 'ワフウ',
    board: '#896B00',
    border: '#463500',
    first: '#000',
    second: '#fff',
  },
  {
    id: 2,
    name: 'シンプル',
    board: '#FBFBF6',
    border: '#6C6861',
    first: '#111111',
    second: '#C77556',
  },
  {
    id: 3,
    name: 'クール',
    board: '#F8F8FA',
    border: '#d9d9e6',
    first: '#2D9EE0',
    second: '#979B9E',
  },
  {
    id: 4,
    name: 'ゴージャス',
    board: '#efefef',
    border: '#707265',
    first: '#1A1E23',
    second: '#C9C99D',
  },
  {
    id: 5,
    name: 'フレンチシック',
    board: '#BCD0F3',
    border: '#F0EFF8',
    first: '#f0d9ab',
    second: '#fff',
  },
  {
    id: 6,
    name: 'レトロ',
    border: '#f7f5eb',
    board: '#8DC2C0',
    first: '#114a3e',
    second: '#e8f0eb',
  },
  {
    id: 7,
    name: 'ハイカラ',
    board: '#EEEEEE',
    border: '#041562',
    first: '#DA1212',
    second: '#11468F',
  },
  {
    id: 8,
    name: 'ポップ',
    board: '#f9fce9',
    border: '#FFD301',
    first: '#fa5880',
    second: '#20a8da',
  },
  {
    id: 9,
    name: 'コクバン',
    board: '#3A6351',
    border: '#393232',
    first: '#E48257',
    second: '#F2EDD7',
  },
  {
    id: 10,
    name: 'コーヒー',
    board: '#e4d9ce',
    border: '#865439',
    first: '#C68B59',
    second: '#8FC1D4',
  },
  {
    id: 11,
    name: 'サクラ',
    board: '#f5f2e6',
    border: '#AAC4AD',
    first: '#FBBDAD',
    second: '#AC8262',
  },
  {
    id: 12,
    name: 'サマー',
    board: '#FEF9EF',
    border: '#A2D2FF',
    first: '#FF865E',
    second: '#FEE440',
  },
  {
    id: 13,
    name: 'ハロウィン',
    board: '#EADEDE',
    border: '#B85252',
    first: '#000000',
    second: '#F58840',
  },
  {
    id: 14,
    name: 'クリスマス',
    board: '#F9FCFB',
    border: '#c1ab05',
    first: '#FD5E53',
    second: '#48e499',
  },
];
