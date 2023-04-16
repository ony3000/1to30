import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeLayout({ className, children }: ComponentProps<'div'>) {
  return (
    <div className={classNames('flex min-w-0 flex-auto flex-nowrap', className)}>{children}</div>
  );
}
