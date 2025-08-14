export interface AudioConfig {
  src: string;
  volume: number;
  loop: boolean;
  fadeIn?: number;
  fadeOut?: number;
  autoplay?: boolean;
  preload?: boolean;
}

export interface LyricsLine {
  timestamp: number;
  text: string;
  duration: number;
  color?: string;
  fontSize?: string;
}

export interface AudioState {
  isLoaded: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  error?: string;
}

export interface AudioController {
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  fadeIn: (duration?: number) => void;
  fadeOut: (duration?: number) => void;
}
