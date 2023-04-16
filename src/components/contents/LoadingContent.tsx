import { VeeLayout } from '@/components/vuetify-imitation';

export default function LoadingContent() {
  return (
    <VeeLayout className="h-full items-center justify-center">
      <span className="fas fa-spinner animate-spin text-[32px] text-legacy-brown [animation-duration:1.5s]" />
    </VeeLayout>
  );
}
