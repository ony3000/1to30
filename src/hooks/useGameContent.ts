export default function useGameContent() {
  const countdown = 3;
  const isLoading = false;
  const isEnd = false;
  const isTimeOver = true;
  const isDisappear = false;

  return {
    countdown,
    isLoading,
    isEnd,
    isTimeOver,
    isDisappear,
  };
}
