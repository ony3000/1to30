import { Tab } from '@headlessui/react';
import { classNames } from '@/adaptors';
import {
  VeeSheet,
  VeeLayout,
  VeeBadge,
  VeeIcon,
  VeeLeftTooltip,
} from '@/components/vuetify-imitation';
import type { RefinedGameRecord } from '@/miscs/types';

type RankingTabPanelProps = {
  data?: RefinedGameRecord[];
};

export default function RankingTabPanel({ data = [] }: RankingTabPanelProps) {
  const isEmpty = data.length === 0;

  return (
    <Tab.Panel className="h-full">
      <VeeSheet className="h-full overflow-y-auto rounded-none">
        {isEmpty && (
          <VeeLayout className="h-full items-center justify-center">
            <div>저장된 기록이 없습니다.</div>
          </VeeLayout>
        )}
        {!isEmpty && (
          <div className="py-2">
            {data.map((gameRecord, index) => (
              <div
                key={gameRecord.uuid}
                className="relative flex h-14 items-center px-4 text-[16px] text-[inherit]"
              >
                <VeeSheet className="w-[45px] shrink-0">
                  <VeeBadge
                    element={<span>N</span>}
                    isActive={gameRecord.isLatest}
                  >
                    <span className="inline-block min-w-[10px]">{gameRecord.rank}</span>
                  </VeeBadge>{' '}
                  {index < 3 && (
                    <VeeIcon
                      className={classNames(
                        'fas fa-medal',
                        { '!text-legacy-gold': gameRecord.rank === '1' },
                        { '!text-legacy-silver': gameRecord.rank === '2' },
                        { '!text-legacy-bronze': gameRecord.rank === '3' },
                      )}
                    />
                  )}
                </VeeSheet>
                <div
                  className={classNames(
                    `flex h-full flex-auto flex-col items-start justify-center overflow-hidden pr-1
                      text-left`,
                  )}
                >
                  <div
                    className={classNames('relative h-6 w-full truncate leading-6', {
                      'italic text-neutral-400': !gameRecord.name,
                    })}
                  >
                    {gameRecord.name || '(이름 없음)'}
                  </div>
                  <div className="truncate text-[14px] text-black/50 dark:text-white/70">
                    {gameRecord.score.toFixed(3)}
                  </div>
                </div>
                <div className="flex min-w-[56px] flex-col items-end justify-between whitespace-nowrap py-2">
                  <VeeLeftTooltip element={<span>{gameRecord.formattedDate}</span>}>
                    <span className="text-[13px] text-neutral-400">{gameRecord.relativeTime}</span>
                  </VeeLeftTooltip>
                  <span>
                    <VeeIcon className={gameRecord.osIconClassName} />{' '}
                    <VeeIcon className={gameRecord.browserIconClassName} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </VeeSheet>
    </Tab.Panel>
  );
}
