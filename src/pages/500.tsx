import { VeeLayout } from '@/components/vuetify-imitation';

export default function Custom500() {
  return (
    <VeeLayout className="h-full items-center justify-center">
      <div>
        <h1 className="mr-5 inline-block border-r border-black/30 pr-6 align-top text-[24px] font-medium leading-[48px]">
          500
        </h1>
        <div className="inline-block text-left">
          <h2 className="text-[14px] leading-[48px]">Internal Server Error.</h2>
        </div>
      </div>
    </VeeLayout>
  );
}
