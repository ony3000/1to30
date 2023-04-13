import type { ComponentProps } from 'react';

export default function VeeContent({ children }: ComponentProps<'div'>) {
  return (
    <div className="flex max-w-full flex-auto shrink-0 transition-all duration-200">
      <div className="relative max-w-full flex-auto">{children}</div>
    </div>
  );
}
