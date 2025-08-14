export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  opacity: number;
  shape: ParticleShape;
}

export interface ParticleConfig {
  count: number;
  speed: { min: number; max: number };
  color: string | string[];
  size: { min: number; max: number };
  shape: ParticleShape;
  gravity?: number;
  friction?: number;
  bounce?: boolean;
}

export type ParticleShape = 'circle' | 'heart' | 'star' | 'character' | 'square';

export interface ParticleSystem {
  particles: Particle[];
  config: ParticleConfig;
  canvas?: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
}

export interface MatrixCharacter {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  color: string;
  fontSize: number;
}
