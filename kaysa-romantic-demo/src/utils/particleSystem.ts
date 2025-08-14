import { Particle, ParticleConfig, ParticleSystem, MatrixCharacter } from '@/types/particles';

export class ParticleSystemManager {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private config: ParticleConfig;

  constructor(canvas: HTMLCanvasElement, config: ParticleConfig) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.config = config;
    this.initializeParticles();
  }

  private initializeParticles(): void {
    this.particles = [];
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): Particle {
    const colors = Array.isArray(this.config.color) ? this.config.color : [this.config.color];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: `particle-${Date.now()}-${Math.random()}`,
      x: Math.random() * (this.canvas?.width || 0),
      y: Math.random() * (this.canvas?.height || 0),
      vx: (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min,
      vy: (Math.random() - 0.5) * (this.config.speed.max - this.config.speed.min) + this.config.speed.min,
      life: 1,
      maxLife: 1,
      color,
      size: Math.random() * (this.config.size.max - this.config.size.min) + this.config.size.min,
      opacity: 1,
      shape: this.config.shape
    };
  }

  private updateParticle(particle: Particle): void {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    if (this.config.gravity) {
      particle.vy += this.config.gravity;
    }
    
    if (this.config.friction) {
      particle.vx *= this.config.friction;
      particle.vy *= this.config.friction;
    }
    
    particle.life -= 0.01;
    particle.opacity = particle.life;
    
    // Reset particle if it goes out of bounds or dies
    if (particle.life <= 0 || this.isOutOfBounds(particle)) {
      Object.assign(particle, this.createParticle());
    }
  }

  private isOutOfBounds(particle: Particle): boolean {
    if (!this.canvas) return false;
    return (
      particle.x < -particle.size ||
      particle.x > this.canvas.width + particle.size ||
      particle.y < -particle.size ||
      particle.y > this.canvas.height + particle.size
    );
  }

  private drawParticle(particle: Particle): void {
    if (!this.context) return;
    
    this.context.save();
    this.context.globalAlpha = particle.opacity;
    this.context.fillStyle = particle.color;
    
    switch (particle.shape) {
      case 'circle':
        this.drawCircle(particle);
        break;
      case 'heart':
        this.drawHeart(particle);
        break;
      case 'star':
        this.drawStar(particle);
        break;
      default:
        this.drawCircle(particle);
    }
    
    this.context.restore();
  }

  private drawCircle(particle: Particle): void {
    if (!this.context) return;
    this.context.beginPath();
    this.context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.context.fill();
  }

  private drawHeart(particle: Particle): void {
    if (!this.context) return;
    const size = particle.size;
    this.context.beginPath();
    this.context.moveTo(particle.x, particle.y + size / 4);
    this.context.bezierCurveTo(particle.x, particle.y, particle.x - size / 2, particle.y, particle.x - size / 2, particle.y + size / 4);
    this.context.bezierCurveTo(particle.x - size / 2, particle.y + size / 2, particle.x, particle.y + size, particle.x, particle.y + size);
    this.context.bezierCurveTo(particle.x, particle.y + size, particle.x + size / 2, particle.y + size / 2, particle.x + size / 2, particle.y + size / 4);
    this.context.bezierCurveTo(particle.x + size / 2, particle.y, particle.x, particle.y, particle.x, particle.y + size / 4);
    this.context.fill();
  }

  private drawStar(particle: Particle): void {
    if (!this.context) return;
    const size = particle.size;
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2;
    
    this.context.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = particle.x + Math.cos(angle) * radius;
      const y = particle.y + Math.sin(angle) * radius;
      
      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
    }
    this.context.closePath();
    this.context.fill();
  }

  public animate(): void {
    if (!this.context || !this.canvas) return;
    
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public start(): void {
    this.animate();
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public updateConfig(newConfig: Partial<ParticleConfig>): void {
    this.config = { ...this.config, ...newConfig };
    this.initializeParticles();
  }

  public resize(width: number, height: number): void {
    if (this.canvas) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }
}

export class MatrixRainEffect {
  private characters: MatrixCharacter[] = [];
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d')!;
    this.initializeCharacters();
  }

  private initializeCharacters(): void {
    this.characters = [];
    const columns = Math.floor(this.canvas.width / 20);
    
    for (let i = 0; i < columns; i++) {
      this.characters.push({
        char: this.getRandomChar(),
        x: i * 20,
        y: Math.random() * -500,
        speed: Math.random() * 3 + 1,
        opacity: Math.random(),
        color: '#00ff41',
        fontSize: 16
      });
    }
  }

  private getRandomChar(): string {
    return this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
  }

  public animate(): void {
    this.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.characters.forEach(char => {
      this.context.font = `${char.fontSize}px monospace`;
      this.context.fillStyle = char.color;
      this.context.globalAlpha = char.opacity;
      this.context.fillText(char.char, char.x, char.y);
      
      char.y += char.speed;
      
      if (char.y > this.canvas.height + 100) {
        char.y = Math.random() * -500;
        char.char = this.getRandomChar();
        char.opacity = Math.random();
      }
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public start(): void {
    this.animate();
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public updateColor(color: string): void {
    this.characters.forEach(char => {
      char.color = color;
    });
  }
}
