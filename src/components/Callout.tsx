import type { ComponentProps } from 'react';
import classNames from 'classnames';

export default function Callout({ children }: ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        'rounded-xl border px-4 py-4',
        'border-zinc-400/30 bg-gray-100/50',
        'dark:border-neutral-500/30 dark:bg-neutral-900/50',
      )}
    >
      {children}
    </div>
  );
}
