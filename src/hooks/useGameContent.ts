import { useState, useMemo } from 'react';
import { PhaseEnum } from '@/miscs/constants';

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