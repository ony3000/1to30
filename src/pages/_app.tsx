import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import classNames from 'classnames';
import { pretendard } from '@/fonts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={classNames(pretendard.variable, 'font-sans')}>
      <Component {...pageProps} />
    </div>
  );
}
