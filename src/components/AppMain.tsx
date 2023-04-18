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
import { ContentEnum } from '@/types';

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
          {content !== ContentEnum.index && (
            <VeeButton
              className={classNames(
                `!fixed left-4 bottom-4 !m-0 w-9 !min-w-0 justify-center rounded-full bg-transparent p-0
                text-black/90 !shadow-none`,
              )}
              onClick={() => setContent(ContentEnum.index)}
            >
              <VeeIcon className="fas fa-arrow-left" />
            </VeeButton>
          )}
        </VeeContent>
      </VeeApp>
    </main>
  );
}
