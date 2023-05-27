import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeOverlay({ className }: ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        `pointer-events-auto fixed inset-0 touch-none before:absolute before:inset-0 before:z-[1]
        before:h-full before:w-full before:bg-neutral-800 before:opacity-70 before:content-[""]`,
        className,
      )}
    />
  );
}
