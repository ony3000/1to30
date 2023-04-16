import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeIcon({ className, children }: ComponentProps<'i'>) {
  return (
    <i
      className={classNames(
        'inline-flex items-center justify-center align-text-bottom text-[24px] leading-none',
        className,
      )}
    >
      {children}
    </i>
  );
}
