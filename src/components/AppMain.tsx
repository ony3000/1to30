import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { classNames } from '@/adaptors';
import { pretendard } from '@/fonts';
import { isClientReadyState } from '@/store/atoms';
import { VeeApp, VeeContent, VeeContainer, VeeSheet } from '@/components/vuetify-imitation';

export default function AppMain({ children }: ComponentProps<'main'>) {
  const [isClientReady, setIsClientReady] = useRecoilState(isClientReadyState);

  useEffect(() => {
    if (!isClientReady) {
      setIsClientReady(true);
    }
  }, [isClientReady, setIsClientReady]);

  return (
    <main className={classNames(pretendard.variable, 'font-sans')}>
      <VeeApp>
        <VeeContent>
          <VeeContainer>
            <VeeSheet
              className={classNames(
                `h-full w-full !border-transparent !bg-transparent portrait:max-w-[540px]
                landscape:max-h-[540px]`,
              )}
            >
              {children}
            </VeeSheet>
          </VeeContainer>
        </VeeContent>
      </VeeApp>
    </main>
  );
}
