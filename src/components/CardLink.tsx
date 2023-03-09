import { Inter } from 'next/font/google';
import classNames from 'classnames';

const inter = Inter({ subsets: ['latin'] });

type CardLinkProps = {
  href: string;
  title: string;
  description: string;
};

export default function CardLink({ href, title, description }: CardLinkProps) {
  return (
    <a
      href={href}
      className={classNames(
        'group rounded-xl border border-solid py-4 px-10 transition-colors duration-200 ease-ease',
        'border-zinc-500/0 bg-gray-400/0',
        'dark:border-stone-300/0 dark:bg-stone-500/0',
        'tablet:px-[19.2px]',
        'non-touch-device:hover:border-zinc-500/[.15] non-touch-device:hover:bg-gray-400/10',
        'dark:non-touch-device:hover:border-stone-300/[.15] dark:non-touch-device:hover:bg-stone-500/10',
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={classNames(inter.className, 'mb-2 font-semibold tablet:mb-[11.2px]')}>
        {title}{' '}
        <span
          className={classNames(
            'inline-block transition-transform duration-200 ease-ease',
            'motion-safe:non-touch-device:group-hover:translate-x-1',
          )}
        >
          -&gt;
        </span>
      </h2>
      <p
        className={classNames(
          inter.className,
          'm-0 max-w-[30ch] text-[14.4px] leading-normal opacity-60',
        )}
      >
        {description}
      </p>
    </a>
  );
}
