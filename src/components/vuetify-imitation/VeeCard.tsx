import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';
import VeeSheet from './VeeSheet';

export default function VeeCard({ className, children }: ComponentProps<'div'>) {
  return (
    <VeeSheet
      className={classNames(
        'shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]',
        className,
      )}
    >
      {children}
    </VeeSheet>
  );
}
