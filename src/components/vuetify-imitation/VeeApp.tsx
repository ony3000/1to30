import type { ComponentProps } from 'react';

export default function VeeApp({ children }: ComponentProps<'div'>) {
  return (
    <div className="flex bg-zinc-50 text-black/90">
      <div className="fixed inset-0 flex min-h-screen max-w-full flex-auto flex-col overflow-hidden [backface-visibility:hidden]">
        {children}
      </div>
    </div>
  );
}
