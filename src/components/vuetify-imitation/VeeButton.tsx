import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

export default function VeeButton({
  className,
  disabled,
  onTouchStart,
  onClick,
  children,
}: ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={classNames(
        `shadow-elevation-2 active:shadow-elevation-8
        relative mx-2 my-1.5 inline-flex h-9 min-w-[88px] flex-auto shrink-0 grow-0 select-none
        items-center justify-center rounded-sm align-middle text-[14px] font-medium uppercase
        outline-0 transition-[all,color] duration-[300ms,1ms] will-change-[box-shadow]
        before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[inherit]
        before:text-[inherit] before:opacity-10 before:transition-all before:duration-300 before:content-[""]
        hover:relative hover:before:bg-current focus:relative focus:before:bg-current
        active:before:bg-current active:before:opacity-20`,
        className,
      )}
      disabled={disabled}
      onTouchStart={onTouchStart}
      onClick={onClick}
    >
      <div
        className={classNames(
          `relative mx-auto flex w-[inherit] flex-auto shrink-0 items-center justify-center whitespace-nowrap
          rounded-[inherit] text-[inherit]`,
        )}
      >
        {children}
      </div>
    </button>
  );
}
