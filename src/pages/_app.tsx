import '@fortawesome/fontawesome-free/css/all.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { AppMain } from '@/components';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>1부터 30까지!</title>
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="1부터 30까지!"
        />
        <meta
          name="author"
          content="Hyeonjong"
        />
        <meta
          name="description"
          content="1부터 30까지 빠르게 누르는 게임입니다."
        />
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,minimal-ui"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:title"
          content="1부터 30까지!"
        />
        <meta
          property="og:description"
          content="1부터 30까지 빠르게 누르는 게임입니다."
        />
        <meta
          property="og:site_name"
          content="1부터 30까지!"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/icons/icon-512x512.png"
        />
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
      </Head>
      <RecoilRoot>
        <AppMain>
          <Component {...pageProps} />
        </AppMain>
      </RecoilRoot>
    </>
  );
}
