import { Tab } from '@headlessui/react';
import { VeeLayout, VeeFlex } from '@/components/vuetify-imitation';
import { useRankingContent } from '@/hooks';
import { RankingTab, RankingTabPanel } from './parts';

export default function RankingContent() {
  const { localRanking, dailyRanking } = useRankingContent();

  return (
    <VeeLayout className="h-full !flex-wrap justify-center">
      <VeeFlex className="max-h-full">
        <Tab.Group>
          <Tab.List className="relative flex h-12 flex-auto shrink-0 whitespace-nowrap bg-legacy-amber">
            <RankingTab>Local</RankingTab>
            <RankingTab>Daily</RankingTab>
          </Tab.List>
          <Tab.Panels className="h-[calc(100%-48px)]">
            <RankingTabPanel data={localRanking} />
            <RankingTabPanel data={dailyRanking} />
          </Tab.Panels>
        </Tab.Group>
      </VeeFlex>
    </VeeLayout>
  );
}
