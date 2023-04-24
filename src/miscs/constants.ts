export enum ContentEnum {
  INDEX = '/index',
  GAME = '/game',
  RANKING = '/ranking',
}

export enum TimeEnum {
  SECOND = 1000,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
}

export enum RankEnum {
  LAST_VISIBLE_PLACE = 30,
  LAST_PLACE = 99,
}

export const OUT_OF_RANK_SYMBOL = String.fromCodePoint(8212); // &mdash;
