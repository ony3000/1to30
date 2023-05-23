export enum ContentEnum {
  INDEX = '/index',
  GAME = '/game',
  RANKING = '/ranking',
}

export enum TimeEnum {
  MILLISECOND = 1,
  SECOND = 1000 * MILLISECOND,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
}

export enum RankEnum {
  LAST_VISIBLE_PLACE = 30,
  LAST_PLACE = 99,
}

export enum PhaseEnum {
  INIT = 'init',
  PREPARE = 'prepare',
  PROGRESS = 'progress',
  END = 'end',
}

export const IS_DEBUGGING_MODE = process.env.NEXT_PUBLIC_DEBUG === String(true);

export const OUT_OF_RANK_SYMBOL = String.fromCodePoint(8212); // &mdash;
