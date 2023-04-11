export type Record = {
  name: string;
  score: number;
  timestamp: number;
  userAgent: string;
  uuid: string;
};

export enum ContentEnum {
  index = '/index',
  game = '/game',
  ranking = '/ranking',
}
