export type GameRecord = {
  name: string;
  score: number;
  timestamp: number;
  userAgent: string;
  uuid: string;
};

export type RankedGameRecord = GameRecord & {
  rank: string;
  isLatest: boolean;
};

export type RefinedGameRecord = RankedGameRecord & {
  osIconClassName: string;
  browserIconClassName: string;
  formattedDate: string;
  relativeTime: string;
};
