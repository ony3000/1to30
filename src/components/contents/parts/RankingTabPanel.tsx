import { Tab } from '@headlessui/react';
import { classNames } from '@/adaptors';
import { VeeSheet, VeeLayout, VeeBadge, VeeIcon } from '@/components/vuetify-imitation';

type RankingTabPanelProps = {
  data?: unknown[];
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
              <div className="relative flex h-14 items-center px-4 text-[16px] text-[inherit]">
                <VeeSheet className="w-[45px]">
                  <VeeBadge
                    element={<span>N</span>}
                    isActive={gameRecord.isLatest}
                  >
                    <span className="inline-block min-w-[10px]">{gameRecord.rank}</span>
                  </VeeBadge>{' '}
                  {index < 3 && <VeeIcon className="fas fa-medal" />}
                </VeeSheet>
                <div
                  className={classNames(
                    `flex h-full flex-auto flex-col items-start justify-center overflow-hidden pr-1
                      text-left`,
                  )}
                >
                  <div
                    className={classNames('relative h-6 truncate leading-6', {
                      'italic text-neutral-400': !gameRecord.name,
                    })}
                  >
                    {gameRecord.name || '(이름 없음)'}
                  </div>
                  <div className="truncate text-[14px] text-black/50">
                    {(gameRecord.score || 12.34).toFixed(3)}
                  </div>
                </div>
                <div className="flex min-w-[56px] flex-col items-end justify-between whitespace-nowrap py-2">
                  <span className="text-[13px] text-neutral-400">{gameRecord.readableDate}</span>
                  <span>
                    <VeeIcon className="fab fa-windows" /> <VeeIcon className="fab fa-chrome" />
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
