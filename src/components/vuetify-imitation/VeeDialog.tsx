import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';
import VeeOverlay from './VeeOverlay';

export default function VeeDialog({ children }: ComponentProps<'div'>) {
  return (
    <>
      <VeeOverlay className="z-[100]" />
      <div
        tabIndex={-1}
        className={classNames(
          `pointer-events-none fixed top-0 left-0 z-[110] flex h-full w-full items-center justify-center
          outline-none`,
        )}
      >
        <div className="pointer-events-auto z-[inherit] m-6 max-h-[90%] w-[300px] overflow-y-auto rounded-sm">
          {children}
        </div>
      </div>
    </>
  );
}
