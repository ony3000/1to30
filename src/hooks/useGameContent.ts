import { useRef, useState, useMemo, useEffect } from 'react';
import { TimeEnum, PhaseEnum } from '@/miscs/constants';
import { shuffle } from '@/miscs/utils';

const lastTileNumber = 30;
const tileCount = 16;
const preparePhaseDuration = 3 * TimeEnum.SECOND;

export default function useGameContent() {
  const isTimeOver = false;
  const isDisappear = false;

  const [currentPhase, setCurrentPhase] = useState(PhaseEnum.INIT);
  const isInitPhase = useMemo(() => currentPhase === PhaseEnum.INIT, [currentPhase]);
  const isPreparePhase = useMemo(() => currentPhase === PhaseEnum.PREPARE, [currentPhase]);
  const isProgressPhase = useMemo(() => currentPhase === PhaseEnum.PROGRESS, [currentPhase]);
  const isEndPhase = useMemo(() => currentPhase === PhaseEnum.END, [currentPhase]);

  const [exposedTileNumbers, setExposedTileNumbers] = useState<(number | null)[]>([]);
  const [standbyTileNumbers, setStandbyTileNumbers] = useState<(number | null)[]>([]);

  const preparePhaseStartedAt = useRef<number>();
  const [elapsedTime, setElapsedTime] = useState(0);
  const countdown = useMemo(
    () => Math.ceil((preparePhaseDuration - elapsedTime) / TimeEnum.SECOND),
    [elapsedTime],
  );

  useEffect(() => {
    if (currentPhase === PhaseEnum.INIT) {
      const layerCount = Math.ceil(lastTileNumber / tileCount);

      setExposedTileNumbers(
        shuffle(
          [...Array(tileCount)].map((_, index) => (index < lastTileNumber ? 1 + index : null)),
        ),
      );

      if (layerCount > 1) {
        const tempTileNumbers: (number | null)[] = [];

        for (let layerIndex = 1; layerIndex < layerCount; layerIndex += 1) {
          tempTileNumbers.push(
            ...shuffle(
              [...Array(tileCount)]
                .map((_, index) => index + tileCount * layerIndex)
                .map((index) => (index < lastTileNumber ? 1 + index : null)),
            ),
          );
        }

        setStandbyTileNumbers(tempTileNumbers);
      }

      setCurrentPhase(PhaseEnum.PREPARE);
    }
  }, [currentPhase]);

  useEffect(() => {
    let timerId: number;

    if (currentPhase === PhaseEnum.PREPARE) {
      if (preparePhaseStartedAt.current === undefined) {
        preparePhaseStartedAt.current = new Date().getTime();
      }

      timerId = window.setInterval(() => {
        const realElapsedTime = preparePhaseStartedAt.current
          ? new Date().getTime() - preparePhaseStartedAt.current
          : 0;

        setElapsedTime(Math.min(realElapsedTime, preparePhaseDuration));

        if (realElapsedTime >= preparePhaseDuration) {
          window.clearInterval(timerId);
          setCurrentPhase(PhaseEnum.PROGRESS);
        }
      }, 5 * TimeEnum.MILLISECOND);
    }

    return () => {
      if (currentPhase === PhaseEnum.PREPARE) {
        window.clearInterval(timerId);
      }
    };
  }, [currentPhase]);

  return {
    isTimeOver,
    isDisappear,

    isInitPhase,
    isPreparePhase,
    isProgressPhase,
    isEndPhase,
    exposedTileNumbers,
    countdown,
  };
}
