import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { contentState } from '@/store/atoms';
import { LoadingContent, IndexContent, GameContent, RankingContent } from '@/components/contents';
import { ContentEnum } from '@/miscs/constants';

export default function Home() {
  const content = useRecoilValue(contentState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(() => false);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingContent />}
      {!isLoading && content === ContentEnum.INDEX && <IndexContent />}
      {!isLoading && content === ContentEnum.GAME && <GameContent />}
      {!isLoading && content === ContentEnum.RANKING && <RankingContent />}
    </>
  );
}
