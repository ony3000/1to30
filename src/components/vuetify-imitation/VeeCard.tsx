import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';
import VeeSheet from './VeeSheet';

export default function VeeCard({ className, children }: ComponentProps<'div'>) {
  return <VeeSheet className={classNames('shadow-elevation-2', className)}>{children}</VeeSheet>;
}
