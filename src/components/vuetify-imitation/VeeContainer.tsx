import type { ComponentProps } from 'react';

export default function VeeContainer({ children }: ComponentProps<'div'>) {
  return (
    <div className="m-auto flex h-full w-full max-w-full items-center justify-center p-4 md:p-6">
      {children}
    </div>
  );
}
