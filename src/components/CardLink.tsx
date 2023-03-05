import { Inter } from 'next/font/google';
import classNames from 'classnames';
import styles from '@/styles/CardLink.module.css';

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
        styles.card,
        'rounded-xl border border-solid py-4 px-10 transition-[background,border] duration-200 ease-ease',
        'border-zinc-500/0 bg-gray-400/0',
        'dark:border-stone-300/0 dark:bg-stone-500/0',
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={classNames(inter.className, 'mb-2 font-semibold')}>
        {title}{' '}
        <span className="inline-block transition-transform duration-200 ease-ease">-&gt;</span>
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
