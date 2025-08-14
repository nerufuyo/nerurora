import { useState, useEffect, useCallback } from 'react';
import { AnimationSequence, AnimationPhase } from '@/types/animation';

export const useAnimationSequence = (phases: AnimationPhase[]) => {
  const [sequence, setSequence] = useState<AnimationSequence>({
    currentPhase: 0,
    phases,
    isPlaying: false,
    isComplete: false
  });

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const nextPhase = useCallback(() => {
    setSequence(prev => {
      const nextPhaseIndex = prev.currentPhase + 1;
      
      if (nextPhaseIndex >= prev.phases.length) {
        return {
          ...prev,
          isComplete: true,
          isPlaying: false
        };
      }

      return {
        ...prev,
        currentPhase: nextPhaseIndex
      };
    });
  }, []);

  const startSequence = useCallback(() => {
    setSequence(prev => ({
      ...prev,
      isPlaying: true,
      isComplete: false,
      currentPhase: 0
    }));
  }, []);

  const stopSequence = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    setSequence(prev => ({
      ...prev,
      isPlaying: false
    }));
  }, [timeoutId]);

  const resetSequence = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    setSequence(prev => ({
      ...prev,
      currentPhase: 0,
      isPlaying: false,
      isComplete: false
    }));
  }, [timeoutId]);

  const goToPhase = useCallback((phaseIndex: number) => {
    if (phaseIndex >= 0 && phaseIndex < phases.length) {
      setSequence(prev => ({
        ...prev,
        currentPhase: phaseIndex
      }));
    }
  }, [phases.length]);

  useEffect(() => {
    if (sequence.isPlaying && !sequence.isComplete) {
      const currentPhase = sequence.phases[sequence.currentPhase];
      
      if (currentPhase) {
        const duration = currentPhase.duration + (currentPhase.delay || 0);
        const id = setTimeout(nextPhase, duration);
        setTimeoutId(id);
        
        return () => {
          clearTimeout(id);
        };
      }
    }
  }, [sequence.currentPhase, sequence.isPlaying, sequence.isComplete, nextPhase]);

  const getCurrentPhase = useCallback(() => {
    return sequence.phases[sequence.currentPhase] || null;
  }, [sequence.phases, sequence.currentPhase]);

  const getProgress = useCallback(() => {
    return sequence.phases.length > 0 
      ? sequence.currentPhase / sequence.phases.length 
      : 0;
  }, [sequence.currentPhase, sequence.phases.length]);

  return {
    sequence,
    startSequence,
    stopSequence,
    resetSequence,
    nextPhase,
    goToPhase,
    getCurrentPhase,
    getProgress
  };
};
