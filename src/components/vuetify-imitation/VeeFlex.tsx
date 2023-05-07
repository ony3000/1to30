import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeFlex({ className, children }: ComponentProps<'div'>) {
  return <div className={classNames('max-w-full flex-auto', className)}>{children}</div>;
}
