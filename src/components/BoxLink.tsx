import classNames from 'classnames';

type BoxLinkProps = {
  href: string;
  title: string;
  description: string;
};

export default function BoxLink({ href, title, description }: BoxLinkProps) {
  return (
    <a
      href={href}
      className={classNames(
        'group space-y-2 rounded-xl border p-4 transition-colors duration-200',
        'border-zinc-500/0 bg-gray-400/0',
        'dark:border-stone-300/0 dark:bg-stone-500/0',
        'non-touch-device:hover:border-zinc-500/[.15] non-touch-device:hover:bg-gray-400/10',
        'dark:non-touch-device:hover:border-stone-300/[.15] dark:non-touch-device:hover:bg-stone-500/10',
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className="font-semibold">
        {title}{' '}
        <span
          className={classNames(
            'inline-block transition-transform duration-200',
            'motion-safe:non-touch-device:group-hover:translate-x-1',
          )}
        >
          &rarr;
        </span>
      </h2>
      <p className="text-[14px] opacity-60">{description}</p>
    </a>
  );
}
