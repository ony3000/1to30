import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

type VeeLeftTooltipProps = ComponentProps<'div'> & {
  element: JSX.Element;
};

export default function VeeLeftTooltip({ children, element }: VeeLeftTooltipProps) {
  return (
    <div className="group relative">
      <div
        className={classNames(
          `pointer-events-none absolute top-1/2 right-[calc(100%-5px)] inline-block w-auto -translate-y-1/2
          rounded-sm bg-zinc-600 px-2 py-[5px] text-[13px] leading-[19px] text-white opacity-0
          shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]
          transition-all duration-200 group-hover:-translate-x-[15px] group-hover:opacity-90`,
        )}
      >
        {element}
      </div>
      {children}
    </div>
  );
}
