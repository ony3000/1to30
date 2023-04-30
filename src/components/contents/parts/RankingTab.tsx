import type { TabProps } from '@headlessui/react';
import { Tab } from '@headlessui/react';
import { classNames } from '@/adaptors';

export default function RankingTab({ children }: TabProps<'button'>) {
  return (
    <Tab
      className={classNames(
        `inline-flex h-[inherit] flex-1 items-center justify-center align-middle text-[14px] font-medium
        uppercase text-black/90 ui-selected:shadow-[inset_0_-2px_0_0] ui-selected:shadow-legacy-deep-brown`,
      )}
    >
      {children}
    </Tab>
  );
}
