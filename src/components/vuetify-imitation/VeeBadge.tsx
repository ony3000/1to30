import type { ComponentProps } from 'react';
import { classNames } from '@/adaptors';

type VeeBadgeProps = ComponentProps<'span'> & {
  element: JSX.Element;
  isActive: boolean;
};

export default function VeeBadge({ children, element, isActive }: VeeBadgeProps) {
  return (
    <span className="relative inline-block">
      {children}
      {isActive && (
        <span
          className={classNames(
            `absolute top-[-11px] right-[-22px] z-[1] flex h-[22px] w-[22px] items-center justify-center
            rounded-full bg-red-500 text-[14px] text-white`,
          )}
        >
          {element}
        </span>
      )}
    </span>
  );
}
