import { Tab } from '@headlessui/react';
import { VeeLayout, VeeFlex } from '@/components/vuetify-imitation';
import { RankingTab, RankingTabPanel } from './parts';

export default function RankingContent() {
  return (
    <VeeLayout className="h-full !flex-wrap justify-center">
      <VeeFlex>
        <Tab.Group>
          <Tab.List className="relative flex h-12 flex-auto shrink-0 whitespace-nowrap bg-legacy-amber">
            <RankingTab>Local</RankingTab>
            <RankingTab>Daily</RankingTab>
          </Tab.List>
          <Tab.Panels className="h-[calc(100%-48px)]">
            <RankingTabPanel />
            <RankingTabPanel />
          </Tab.Panels>
        </Tab.Group>
      </VeeFlex>
    </VeeLayout>
  );
}
