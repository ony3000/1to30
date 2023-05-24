import type { ComponentProps } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { classNames } from '@/adaptors';
import { pretendard } from '@/fonts';
import { isClientReadyState, contentState } from '@/store/atoms';
import {
  VeeApp,
  VeeContent,
  VeeContainer,
  VeeSheet,
  VeeButton,
  VeeIcon,
} from '@/components/vuetify-imitation';
import { ContentEnum, IS_DEBUGGING_MODE } from '@/miscs/constants';

export default function AppMain({ children }: ComponentProps<'main'>) {
  const [isClientReady, setIsClientReady] = useRecoilState(isClientReadyState);
  const [content, setContent] = useRecoilState(contentState);

  useEffect(() => {
    if (!isClientReady) {
      setIsClientReady(true);
    }
  }, [isClientReady, setIsClientReady]);

  return (
    <main className={classNames(pretendard.variable, 'font-sans')}>
      <VeeApp>
        <VeeContent>
          {IS_DEBUGGING_MODE && (
            <VeeSheet
              className={classNames(
                `shadow-elevation-2 !fixed bottom-4 right-4 z-10 select-none rounded-lg border border-black/90
                px-1.5 font-medium dark:!border-white`,
              )}
            >
              디버깅 모드
            </VeeSheet>
          )}
          <VeeContainer>
            <VeeSheet
              className={classNames(
                'h-full w-full',
                { 'max-w-[540px]': content === ContentEnum.RANKING },
                {
                  'portrait:max-w-[540px] landscape:max-h-[540px]': content !== ContentEnum.RANKING,
                },
              )}
            >
              {children}
            </VeeSheet>
          </VeeContainer>
          {content !== ContentEnum.INDEX && (
            <VeeButton
              className={classNames(
                `!fixed left-4 bottom-4 !m-0 w-9 !min-w-0 justify-center !rounded-full bg-transparent p-0
                text-black/90 !shadow-none dark:text-white`,
              )}
              onClick={() => setContent(ContentEnum.INDEX)}
            >
              <VeeIcon className="fas fa-arrow-left text-inherit" />
            </VeeButton>
          )}
        </VeeContent>
      </VeeApp>
    </main>
  );
}
