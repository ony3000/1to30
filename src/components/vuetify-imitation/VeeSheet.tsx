import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeSheet({ className, children }: ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        `relative rounded-sm border-white bg-white text-black/90 transition-all duration-300
        dark:border-neutral-700 dark:bg-neutral-700 dark:text-white`,
        className,
      )}
    >
      {children}
    </div>
  );
}
