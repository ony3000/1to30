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
import { useGameContent } from '@/hooks';

export default function GameContent() {
  const {
    isInitPhase,
    isPreparePhase,
    isProgressPhase,
    isEndPhase,
    exposedTileNumbers,
    countdown,
    elapsedTimeForDisplay,
    isHintActive,
    targetNumber,
    targetNumberForDisplay,
    tapping,
  } = useGameContent();

  return (
    <VeeLayout className="h-full items-center justify-center portrait:flex-col">
      {(isInitPhase || isPreparePhase) && (
        <VeeDialog>
          {isPreparePhase && (
            <VeeCard className="select-none border-transparent !bg-transparent text-white">
              <div className="w-full p-4 text-center text-[45px] font-bold leading-[48px]">
                {countdown}
              </div>
            </VeeCard>
          )}
        </VeeDialog>
      )}
      {(isPreparePhase || isProgressPhase || isEndPhase) && (
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
                          <div className="text-[34px] leading-[40px]">{targetNumberForDisplay}</div>
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
                          <div className="text-[34px] leading-[40px] [font-feature-settings:'tnum']">
                            {elapsedTimeForDisplay}
                          </div>
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
                {isEndPhase && (
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
                {!isEndPhase && (
                  <VeeLayout className="h-full !flex-wrap">
                    {exposedTileNumbers.map((tileNumber, index) => (
                      <VeeFlex
                        key={tileNumber === null ? `slot#${index}` : `tile#${tileNumber}`}
                        className="h-1/4 flex-1 grow-0 basis-1/4 p-1"
                      >
                        {tileNumber !== null && (
                          <VeeButton
                            className={classNames(
                              '!m-0 h-full w-full !min-w-0 origin-center scale-100',
                              isHintActive && tileNumber === targetNumber
                                ? 'border-legacy-brown bg-legacy-brown text-white'
                                : 'border-legacy-amber bg-legacy-amber',
                              {
                                '!scale-0 transition-transform !duration-200':
                                  targetNumber > tileNumber,
                              },
                            )}
                            disabled={!isProgressPhase}
                            onClick={() => tapping(tileNumber)}
                          >
                            <VeeLayout className="h-full items-center justify-center text-[24px] leading-8">
                              {tileNumber}
                            </VeeLayout>
                          </VeeButton>
                        )}
                      </VeeFlex>
                    ))}
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
