import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeSheet({ className, children }: ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        'relative rounded-sm border-white bg-white text-black/90 transition-all duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}
