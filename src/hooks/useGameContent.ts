import { useState, useMemo, useEffect } from 'react';
import { PhaseEnum } from '@/miscs/constants';
import { shuffle } from '@/miscs/utils';

const lastTileNumber = 30;
const tileCount = 16;

export default function useGameContent() {
  const countdown = 3;
  const isEnd = false;
  const isTimeOver = true;
  const isDisappear = false;

  const [currentPhase, setCurrentPhase] = useState(PhaseEnum.INIT);
  const isInitPhase = useMemo(() => currentPhase === PhaseEnum.INIT, [currentPhase]);
  const isPreparePhase = useMemo(() => currentPhase === PhaseEnum.PREPARE, [currentPhase]);
  const isProgressPhase = useMemo(() => currentPhase === PhaseEnum.PROGRESS, [currentPhase]);
  const isEndPhase = useMemo(() => currentPhase === PhaseEnum.END, [currentPhase]);

  const [exposedTileNumbers, setExposedTileNumbers] = useState<(number | null)[]>([]);
  const [standbyTileNumbers, setStandbyTileNumbers] = useState<(number | null)[]>([]);

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

  return {
    countdown,
    isEnd,
    isTimeOver,
    isDisappear,

    isInitPhase,
    isPreparePhase,
    isProgressPhase,
    isEndPhase,
  };
}
