import { useState, useEffect, useRef, useCallback } from 'react';
import { AudioManager } from '@/utils/audioUtils';
import { AudioConfig, AudioState } from '@/types/audio';

export const useAudio = (config: AudioConfig) => {
  const [state, setState] = useState<AudioState>({
    isLoaded: false,
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: 0,
    volume: config.volume
  });

  const audioManagerRef = useRef<AudioManager | null>(null);

  useEffect(() => {
    audioManagerRef.current = new AudioManager(config, setState);

    return () => {
      audioManagerRef.current?.destroy();
    };
  }, []);

  const play = useCallback(() => {
    audioManagerRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioManagerRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    audioManagerRef.current?.stop();
  }, []);

  const setVolume = useCallback((volume: number) => {
    audioManagerRef.current?.setVolume(volume);
  }, []);

  const seek = useCallback((time: number) => {
    audioManagerRef.current?.seek(time);
  }, []);

  const fadeIn = useCallback((duration?: number) => {
    audioManagerRef.current?.fadeIn(duration);
  }, []);

  const fadeOut = useCallback((duration?: number) => {
    audioManagerRef.current?.fadeOut(duration);
  }, []);

  return {
    ...state,
    play,
    pause,
    stop,
    setVolume,
    seek,
    fadeIn,
    fadeOut
  };
};
