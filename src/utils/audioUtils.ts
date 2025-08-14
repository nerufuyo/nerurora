import { Howl, Howler } from 'howler';
import { AudioConfig, AudioState, AudioController } from '@/types/audio';

export class AudioManager implements AudioController {
  private sound: Howl | null = null;
  private state: AudioState;
  private onStateChange?: (state: AudioState) => void;

  constructor(config: AudioConfig, onStateChange?: (state: AudioState) => void) {
    this.onStateChange = onStateChange;
    this.state = {
      isLoaded: false,
      isPlaying: false,
      isPaused: false,
      currentTime: 0,
      duration: 0,
      volume: config.volume
    };

    this.initializeSound(config);
  }

  private initializeSound(config: AudioConfig): void {
    this.sound = new Howl({
      src: [config.src],
      loop: config.loop,
      volume: config.volume,
      preload: config.preload !== false,
      html5: true,
      onload: () => {
        this.updateState({ 
          isLoaded: true, 
          duration: this.sound?.duration() || 0 
        });
      },
      onplay: () => {
        this.updateState({ isPlaying: true, isPaused: false });
        this.startTimeUpdate();
      },
      onpause: () => {
        this.updateState({ isPlaying: false, isPaused: true });
      },
      onstop: () => {
        this.updateState({ 
          isPlaying: false, 
          isPaused: false, 
          currentTime: 0 
        });
      },
      onend: () => {
        this.updateState({ 
          isPlaying: false, 
          isPaused: false, 
          currentTime: 0 
        });
      },
      onloaderror: (id, error) => {
        this.updateState({ error: `Failed to load audio: ${error}` });
      },
      onplayerror: (id, error) => {
        this.updateState({ error: `Failed to play audio: ${error}` });
      }
    });
  }

  private updateState(updates: Partial<AudioState>): void {
    this.state = { ...this.state, ...updates };
    this.onStateChange?.(this.state);
  }

  private startTimeUpdate(): void {
    const updateTime = () => {
      if (this.state.isPlaying && this.sound) {
        this.updateState({ currentTime: this.sound.seek() || 0 });
        requestAnimationFrame(updateTime);
      }
    };
    updateTime();
  }

  public play(): void {
    if (this.sound && this.state.isLoaded) {
      this.sound.play();
    }
  }

  public pause(): void {
    if (this.sound) {
      this.sound.pause();
    }
  }

  public stop(): void {
    if (this.sound) {
      this.sound.stop();
    }
  }

  public setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (this.sound) {
      this.sound.volume(clampedVolume);
    }
    this.updateState({ volume: clampedVolume });
  }

  public seek(time: number): void {
    if (this.sound && this.state.isLoaded) {
      this.sound.seek(time);
      this.updateState({ currentTime: time });
    }
  }

  public fadeIn(duration: number = 1000): void {
    if (this.sound) {
      this.sound.fade(0, this.state.volume, duration);
      this.play();
    }
  }

  public fadeOut(duration: number = 1000): void {
    if (this.sound) {
      this.sound.fade(this.state.volume, 0, duration);
      setTimeout(() => this.stop(), duration);
    }
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  public destroy(): void {
    if (this.sound) {
      this.sound.unload();
      this.sound = null;
    }
  }
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const preloadAudio = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const sound = new Howl({
      src: [src],
      preload: true,
      onload: () => {
        sound.unload();
        resolve();
      },
      onloaderror: (id, error) => {
        reject(new Error(`Failed to preload audio: ${error}`));
      }
    });
  });
};
