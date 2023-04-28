import { useMemo, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import parser from 'ua-parser-js';
import { dayjs } from '@/adaptors';
import { rankingState } from '@/store/atoms';
import type { GameRecord, RankedGameRecord, RefinedGameRecord } from '@/miscs/types';
import { TimeEnum, RankEnum, OUT_OF_RANK_SYMBOL } from '@/miscs/constants';

export default function useRankingContent() {
  const now = dayjs();
  const ranking = useRecoilValue(rankingState);
  const orderedRanking = useMemo(
    () =>
      ranking
        .slice()
        .sort(
          (former, latter) => former.score - latter.score || former.timestamp - latter.timestamp,
        ),
    [ranking],
  );
  const latestGameRecordId = useMemo<string | undefined>(() => {
    const currentTimestamp = Number(now.format('x'));

    return orderedRanking
      .filter((gameRecord) => currentTimestamp - gameRecord.timestamp < TimeEnum.MINUTE * 5)
      .sort((former, latter) => latter.timestamp - former.timestamp)[0]?.uuid;
  }, [now, orderedRanking]);
  const rankedGameRecordMapper = useCallback(
    (gameRecord: GameRecord, index: number): RankedGameRecord => ({
      ...gameRecord,
      rank: index < RankEnum.LAST_PLACE ? String(1 + index) : OUT_OF_RANK_SYMBOL,
      isLatest: gameRecord.uuid === latestGameRecordId,
    }),
    [latestGameRecordId],
  );
  const rankedGameRecordPredicate = useCallback(
    (gameRecord: RankedGameRecord, index: number): boolean =>
      index < RankEnum.LAST_VISIBLE_PLACE || gameRecord.isLatest,
    [],
  );
  const refinedGameRecordMapper = useCallback(
    (gameRecord: RankedGameRecord): RefinedGameRecord => {
      const parsedData = parser(gameRecord.userAgent);
      const osIconClassName = ((osName: string) => {
        switch (osName) {
          case 'windows':
          case 'windows phone':
            return 'fab fa-windows';
          case 'mac os':
          case 'ios':
            return 'fab fa-apple';
          case 'android':
            return 'fab fa-android';
          case 'linux':
            return 'fab fa-linux';
          case 'ubuntu':
            return 'fab fa-ubuntu';
          case 'suse':
            return 'fab fa-suse';
          case 'redhat':
            return 'fab fa-redhat';
          case 'fedora':
            return 'fab fa-fedora';
          case 'centos':
            return 'fab fa-centos';
          case 'playstation':
            return 'fab fa-playstation';
          default:
            return 'fas fa-question';
        }
      })(String(parsedData.os.name).toLowerCase());
      const browserIconClassName = ((browserName: string) => {
        switch (browserName) {
          case 'chrome':
          case 'chrome webview':
            return 'fab fa-chrome';
          case 'firefox':
            return 'fab fa-firefox';
          case 'safari':
          case 'mobile safari':
            return 'fab fa-safari';
          case 'edge':
            return 'fab fa-edge';
          case 'opera':
            return 'fab fa-opera';
          default:
            return 'fas fa-question';
        }
      })(String(parsedData.browser.name).toLowerCase());
      const recordMoment = dayjs(gameRecord.timestamp);

      return {
        ...gameRecord,
        osIconClassName,
        browserIconClassName,
        formattedDate: recordMoment.format('YYYY-MM-DD HH:mm:ss ZZ'),
        relativeTime: now.to(recordMoment),
      };
    },
    [now],
  );
  const localRanking = useMemo(
    () =>
      orderedRanking
        .map(rankedGameRecordMapper)
        .filter(rankedGameRecordPredicate)
        .map(refinedGameRecordMapper),
    [orderedRanking, rankedGameRecordMapper, rankedGameRecordPredicate, refinedGameRecordMapper],
  );
  const dailyRanking = useMemo(() => {
    const midnightTimestamp = Number(now.startOf('day').format('x'));

    return orderedRanking
      .filter((gameRecord) => gameRecord.timestamp >= midnightTimestamp)
      .map(rankedGameRecordMapper)
      .filter(rankedGameRecordPredicate)
      .map(refinedGameRecordMapper);
  }, [
    now,
    orderedRanking,
    rankedGameRecordMapper,
    rankedGameRecordPredicate,
    refinedGameRecordMapper,
  ]);

  return {
    localRanking,
    dailyRanking,
  };
}
