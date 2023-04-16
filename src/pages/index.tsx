import { useState, useEffect } from 'react';
import { LoadingContent, IndexContent } from '@/components/contents';

export default function Home() {
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
      {!isLoading && <IndexContent />}
    </>
  );
}
