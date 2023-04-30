import { classNames } from '@/adaptors';
import {
  VeeLayout,
  VeeDialog,
  VeeCard,
  VeeFlex,
  VeeSheet,
  VeeButton,
  VeeIcon,
} from '@/components/vuetify-imitation';

export default function GameContent() {
  const countdown = 3;
  const isLoading = false;
  const isEnd = false;
  const isTimeOver = true;
  const isDisappear = false;

  return (
    <VeeLayout className="h-full items-center justify-center portrait:flex-col">
      {isLoading && (
        <VeeDialog>
          <VeeCard className="select-none border-transparent !bg-transparent text-white">
            <div className="w-full p-4 text-center text-[45px] font-bold leading-[48px]">
              {countdown}
            </div>
          </VeeCard>
        </VeeDialog>
      )}
      {!isLoading && (
        <>
          <VeeFlex className="grow-0 portrait:w-full portrait:basis-1/4 landscape:h-full landscape:basis-1/3">
            <VeeLayout
              className={classNames(
                `h-full portrait:items-end portrait:justify-between landscape:flex-wrap landscape:items-center
                landscape:justify-end`,
              )}
            >
              <VeeFlex className="grow-0 portrait:basis-1/3 landscape:basis-full">
                <VeeLayout className="landscape:justify-end">
                  <VeeFlex className="grow-0 basis-full landscape:max-w-[220px]">
                    <VeeCard className="select-none">
                      <div className="flex flex-wrap items-center py-1 px-4">
                        <div>
                          <div className="text-[16px]">Next</div>
                          <div className="text-[34px] leading-[40px]">1</div>
                        </div>
                      </div>
                    </VeeCard>
                  </VeeFlex>
                </VeeLayout>
              </VeeFlex>
              <VeeFlex className="grow-0 portrait:basis-7/12 landscape:basis-full">
                <VeeLayout className="landscape:justify-end">
                  <VeeFlex className="grow-0 basis-full landscape:max-w-[220px]">
                    <VeeCard className="select-none">
                      <div className="flex flex-wrap items-center justify-end py-1 px-4 text-right">
                        <div>
                          <div className="text-[16px]">Time</div>
                          <div className="text-[34px] leading-[40px]">100.00</div>
                        </div>
                      </div>
                    </VeeCard>
                  </VeeFlex>
                </VeeLayout>
              </VeeFlex>
            </VeeLayout>
          </VeeFlex>
          <VeeFlex className="grow-0 portrait:w-full portrait:basis-3/4 landscape:h-full landscape:basis-2/3">
            <VeeLayout className="h-full items-center justify-center">
              <VeeSheet
                className={classNames(
                  `h-72 w-72 border-transparent !bg-transparent transition-colors
                  portrait:mb-[calc((((100vh-16px*2)*9/12)-288px)/5+16px)]
                  portrait:md:mb-[calc((((100vh-24px*2)*9/12)-288px)/5+16px)]`,
                )}
              >
                {isEnd && (
                  <VeeLayout className="h-full items-center justify-center">
                    <VeeButton
                      className="bg-legacy-amber px-4"
                      onClick={() => console.log('게임 다시 시작')}
                    >
                      <VeeIcon className="fas fa-redo-alt mr-4 text-inherit" />
                      <span className="text-[16px]">다시 시작</span>
                    </VeeButton>
                  </VeeLayout>
                )}
                {!isEnd && (
                  <VeeLayout className="h-full !flex-wrap">
                    {[...Array(16)].map((_, index) => {
                      const isHintActive = index === 5;

                      return (
                        <VeeFlex
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          className="h-1/4 flex-1 grow-0 basis-1/4 p-1"
                        >
                          <VeeButton
                            className={classNames(
                              '!m-0 h-full w-full !min-w-0 origin-center scale-100',
                              { 'border-legacy-brown bg-legacy-brown text-white': isHintActive },
                              { 'border-legacy-amber bg-legacy-amber': !isHintActive },
                              { '!shadow-none before:hidden': isTimeOver },
                              { '!scale-0 transition-transform !duration-200': isDisappear },
                            )}
                            disabled={isTimeOver}
                            onClick={() => console.log('클릭!')}
                          >
                            <VeeLayout className="h-full items-center justify-center text-[24px] leading-8">
                              {index}
                            </VeeLayout>
                          </VeeButton>
                        </VeeFlex>
                      );
                    })}
                  </VeeLayout>
                )}
              </VeeSheet>
            </VeeLayout>
          </VeeFlex>
        </>
      )}
    </VeeLayout>
  );
}
