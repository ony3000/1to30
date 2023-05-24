import { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { uuid } from '@/adaptors';
import { rankingState } from '@/store/atoms';
import { TimeEnum, PhaseEnum, IS_DEBUGGING_MODE } from '@/miscs/constants';
import { shuffle } from '@/miscs/utils';

const lastTileNumber = 30;
const tileCount = 16;
const preparePhaseDuration = 3 * TimeEnum.SECOND;
const progressPhaseDuration = IS_DEBUGGING_MODE ? 30 * TimeEnum.SECOND : 100 * TimeEnum.SECOND;

export default function useGameContent() {
  const setRanking = useSetRecoilState(rankingState);

  const isTouchEnabled = useMemo(
    () => 'ontouchstart' in window || window.navigator.maxTouchPoints > 0,
    [],
  );

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

  const progressPhaseStartedAt = useRef<number>();
  const [progressPhaseElapsedTime, setProgressPhaseElapsedTime] = useState(0);
  const elapsedTimeForDisplay = useMemo(
    () => (progressPhaseElapsedTime / TimeEnum.SECOND).toFixed(2),
    [progressPhaseElapsedTime],
  );
  const lastSuccessfulTappingAt = useRef<number>();
  const isHintActive = useMemo(() => {
    if (
      progressPhaseStartedAt.current === undefined ||
      lastSuccessfulTappingAt.current === undefined
    ) {
      return false;
    }

    const computedNow = progressPhaseStartedAt.current + progressPhaseElapsedTime;

    return computedNow - lastSuccessfulTappingAt.current >= 2 * TimeEnum.SECOND;
  }, [progressPhaseElapsedTime]);

  const [targetNumber, setTargetNumber] = useState(1);
  const targetNumberForDisplay = useMemo(
    () => (targetNumber > lastTileNumber ? '-' : targetNumber),
    [targetNumber],
  );
  const tapping = useCallback(
    (tileNumber: number) => {
      if (tileNumber === targetNumber) {
        const index = exposedTileNumbers.findIndex(
          (exposedTileNumber) => tileNumber === exposedTileNumber,
        );
        const [standbyTileNumber] = standbyTileNumbers;
        const now = new Date().getTime();
        const realElapsedTime = progressPhaseStartedAt.current
          ? now - progressPhaseStartedAt.current
          : 0;

        setProgressPhaseElapsedTime(Math.min(realElapsedTime, progressPhaseDuration));
        lastSuccessfulTappingAt.current = now;
        setTargetNumber((prevNumber) => prevNumber + 1);

        if (standbyTileNumber !== undefined) {
          setStandbyTileNumbers(standbyTileNumbers.slice(1));

          window.setTimeout(() => {
            setExposedTileNumbers((prevTileNumbers) => [
              ...prevTileNumbers.slice(0, index),
              standbyTileNumber,
              ...prevTileNumbers.slice(index + 1),
            ]);
          }, 200 * TimeEnum.MILLISECOND);
        }

        if (tileNumber === lastTileNumber) {
          setCurrentPhase(PhaseEnum.END);

          const timestamp = new Date().getTime();

          window.setTimeout(() => {
            const score = progressPhaseElapsedTime / TimeEnum.SECOND;
            // eslint-disable-next-line no-alert
            const name = window.prompt(`입력하는 이름으로 ${score}초 기록이 저장됩니다.`, '') || '';
            const { userAgent } = window.navigator;

            if (!IS_DEBUGGING_MODE) {
              setRanking((prevRanking) => [
                ...prevRanking,
                {
                  name,
                  score,
                  timestamp,
                  userAgent,
                  uuid: uuid(),
                },
              ]);
            }
          }, 200 * TimeEnum.MILLISECOND);
        }
      }
    },
    [exposedTileNumbers, progressPhaseElapsedTime, setRanking, standbyTileNumbers, targetNumber],
  );

  const restartGame = useCallback(() => {
    if (!isEndPhase) {
      return;
    }

    setExposedTileNumbers([]);
    setStandbyTileNumbers([]);
    preparePhaseStartedAt.current = undefined;
    setElapsedTime(0);
    progressPhaseStartedAt.current = undefined;
    setProgressPhaseElapsedTime(0);
    lastSuccessfulTappingAt.current = undefined;
    setTargetNumber(1);
    setCurrentPhase(PhaseEnum.INIT);
  }, [isEndPhase]);

  const loggingData = useRef<object>({});

  useEffect(() => {
    if (currentPhase === PhaseEnum.PROGRESS) {
      loggingData.current = {
        // Assign the values you want to log as key-value pairs.
        // (You may need to update this effect's deps array.)
      };
    }
  }, [currentPhase]);

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

      timerId = window.setInterval(
        () => {
          const realElapsedTime = preparePhaseStartedAt.current
            ? new Date().getTime() - preparePhaseStartedAt.current
            : 0;

          setElapsedTime(Math.min(realElapsedTime, preparePhaseDuration));

          if (realElapsedTime >= preparePhaseDuration) {
            window.clearInterval(timerId);
            setCurrentPhase(PhaseEnum.PROGRESS);
          }
        },
        IS_DEBUGGING_MODE ? 500 * TimeEnum.MILLISECOND : 5 * TimeEnum.MILLISECOND,
      );
    }

    return () => {
      if (currentPhase === PhaseEnum.PREPARE) {
        window.clearInterval(timerId);
      }
    };
  }, [currentPhase]);

  useEffect(() => {
    let timerId: number;

    if (currentPhase === PhaseEnum.PROGRESS) {
      const now = new Date().getTime();

      if (progressPhaseStartedAt.current === undefined) {
        progressPhaseStartedAt.current = now;
      }

      if (lastSuccessfulTappingAt.current === undefined) {
        lastSuccessfulTappingAt.current = now;
      }

      timerId = window.setInterval(
        () => {
          const realElapsedTime = progressPhaseStartedAt.current
            ? new Date().getTime() - progressPhaseStartedAt.current
            : 0;

          setProgressPhaseElapsedTime(Math.min(realElapsedTime, progressPhaseDuration));

          if (IS_DEBUGGING_MODE) {
            // eslint-disable-next-line no-console
            console.log(loggingData.current);
          }

          if (realElapsedTime >= progressPhaseDuration) {
            window.clearInterval(timerId);
            setCurrentPhase(PhaseEnum.END);

            window.setTimeout(() => {
              // eslint-disable-next-line no-alert
              window.alert(
                `시간 초과! ${
                  progressPhaseDuration / TimeEnum.SECOND
                }초 안에 게임을 완료하지 못하면 자동으로 종료됩니다.`,
              );
            }, 200 * TimeEnum.MILLISECOND);
          }
        },
        IS_DEBUGGING_MODE ? 500 * TimeEnum.MILLISECOND : 5 * TimeEnum.MILLISECOND,
      );
    }

    return () => {
      if (currentPhase === PhaseEnum.PROGRESS) {
        window.clearInterval(timerId);
      }
    };
  }, [currentPhase]);

  return {
    isTouchEnabled,
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
    restartGame,
  };
}
