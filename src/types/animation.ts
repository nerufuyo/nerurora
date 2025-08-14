export interface AnimationPhase {
  id: string;
  duration: number;
  delay?: number;
  component: React.ComponentType;
}

export interface AnimationSequence {
  currentPhase: number;
  phases: AnimationPhase[];
  isPlaying: boolean;
  isComplete: boolean;
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  easing?: string;
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

export interface TransitionConfig {
  type?: 'spring' | 'tween' | 'inertia';
  stiffness?: number;
  damping?: number;
  mass?: number;
  duration?: number;
  ease?: string | number[];
  delay?: number;
}
