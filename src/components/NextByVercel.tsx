import Image from 'next/image';

export default function NextByVercel() {
  return (
    <div
      data-testid="logo-element"
      className="flex flex-wrap items-center justify-end gap-4 sm:justify-center"
    >
      <Image
        className="dark:drop-shadow-[0_0_4.8px_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <Image
        className="dark:drop-shadow-[0_0_4.8px_#ffffff70] dark:invert"
        src="/thirteen.svg"
        alt="13"
        width={40}
        height={31}
        priority
      />
      <div className="font-mono text-[14px]">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="flex items-center justify-center gap-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{' '}
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </a>
      </div>
    </div>
  );
}
