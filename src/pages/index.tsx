import Head from 'next/head';
import classNames from 'classnames';
import { BoxLink, Callout, NextByVercel } from '@/components';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Tailwind Template</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <div
        className={classNames(
          'flex min-h-screen flex-col gap-8 px-5 py-8',
          'sm:gap-16 sm:px-12 sm:py-16',
          'lg:gap-24 lg:px-20 lg:py-24',
        )}
      >
        <NextByVercel />

        <div className="flex justify-center font-mono text-[14px]">
          <Callout>
            Get started by editing <code className="font-bold">src/pages/index.tsx</code>
          </Callout>
        </div>

        <div
          className={classNames(
            'mx-auto grid max-w-[1100px] grid-cols-1',
            'sm:grid-cols-2',
            'lg:grid-cols-4',
          )}
        >
          <BoxLink
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Docs"
            description="Find in-depth information about Next.js features and API."
          />

          <BoxLink
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Learn"
            description="Learn about Next.js in an interactive course with quizzes!"
          />

          <BoxLink
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Templates"
            description="Discover and deploy boilerplate example Next.js projects."
          />

          <BoxLink
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            title="Deploy"
            description="Instantly deploy your Next.js site to a shareable URL with Vercel."
          />
        </div>
      </div>
    </>
  );
}