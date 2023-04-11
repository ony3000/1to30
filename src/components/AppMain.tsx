import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { pretendard } from '@/fonts';
import { isClientReadyState } from '@/store/atoms';

export default function AppMain({ children }: ComponentProps<'main'>) {
  const [isClientReady, setIsClientReady] = useRecoilState(isClientReadyState);

  useEffect(() => {
    if (!isClientReady) {
      setIsClientReady(true);
    }
  }, [isClientReady, setIsClientReady]);

  return <main className={classNames(pretendard.variable, 'font-sans')}>{children}</main>;
}
