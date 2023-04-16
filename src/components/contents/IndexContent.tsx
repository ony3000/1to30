import Image from 'next/image';
import { classNames } from '@/adaptors';
import { VeeLayout, VeeFlex, VeeButton, VeeIcon } from '@/components/vuetify-imitation';
import logoImage from '@/assets/images/icon-256.png';

export default function IndexContent() {
  return (
    <VeeLayout className="h-full items-center justify-center portrait:flex-col">
      <VeeFlex className="grow-0 basis-1/2 portrait:w-full landscape:h-full">
        <VeeLayout className="h-full items-center justify-center">
          <Image
            className={classNames(
              `portrait:mt-[calc((((100vh-16px*2)*6/12)-256px)/2)]
              portrait:md:mt-[calc((((100vh-24px*2)*6/12)-256px)/2)]
              landscape:ml-[calc((((100vw-16px*2)*6/12)-256px)/2)]
              landscape:md:ml-[calc((((100vw-24px*2)*6/12)-256px)/2)]`,
            )}
            src={logoImage}
            alt="1부터30까지 로고"
            width={256}
            height={256}
            priority
          />
        </VeeLayout>
      </VeeFlex>
      <VeeFlex className="grow-0 basis-1/2 portrait:w-full landscape:h-full">
        <VeeLayout className="h-full items-center portrait:justify-center">
          <VeeFlex
            className={classNames(
              `grow-0 portrait:basis-5/6 landscape:ml-[8.333333%] landscape:max-w-[320px]
              landscape:basis-3/4`,
            )}
          >
            <VeeLayout className="justify-center">
              <VeeFlex>
                <VeeButton className="mx-0 flex w-full flex-1 bg-legacy-amber">
                  <VeeIcon className="fas fa-th mr-4" />
                  <span className="text-[16px]">게임 시작</span>
                </VeeButton>
              </VeeFlex>
            </VeeLayout>
            <VeeLayout className="justify-center">
              <VeeFlex>
                <VeeButton className="mx-0 flex w-full flex-1 bg-legacy-brown text-white">
                  <VeeIcon className="fas fa-trophy mr-4" />
                  <span className="text-[16px]">기록 확인</span>
                </VeeButton>
              </VeeFlex>
            </VeeLayout>
          </VeeFlex>
        </VeeLayout>
      </VeeFlex>
    </VeeLayout>
  );
}
