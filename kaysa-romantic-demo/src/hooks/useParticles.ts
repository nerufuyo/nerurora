import { useState, useEffect, useRef, useCallback } from 'react';
import { ParticleSystemManager } from '@/utils/particleSystem';
import { ParticleConfig } from '@/types/particles';

export const useParticles = (canvasRef: React.RefObject<HTMLCanvasElement | null>, config: ParticleConfig) => {
  const [isActive, setIsActive] = useState(false);
  const particleSystemRef = useRef<ParticleSystemManager | null>(null);

  const initializeParticleSystem = useCallback(() => {
    if (canvasRef.current && config) {
      particleSystemRef.current = new ParticleSystemManager(canvasRef.current, config);
    }
  }, [canvasRef, config]);

  const startParticles = useCallback(() => {
    if (!particleSystemRef.current && canvasRef.current) {
      initializeParticleSystem();
    }
    
    particleSystemRef.current?.start();
    setIsActive(true);
  }, [initializeParticleSystem]);

  const stopParticles = useCallback(() => {
    particleSystemRef.current?.stop();
    setIsActive(false);
  }, []);

  const updateConfig = useCallback((newConfig: Partial<ParticleConfig>) => {
    particleSystemRef.current?.updateConfig(newConfig);
  }, []);

  const resizeCanvas = useCallback((width: number, height: number) => {
    particleSystemRef.current?.resize(width, height);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        resizeCanvas(rect.width, rect.height);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial resize
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      particleSystemRef.current?.stop();
    };
  }, [canvasRef, resizeCanvas]);

  return {
    isActive,
    startParticles,
    stopParticles,
    updateConfig,
    resizeCanvas
  };
};
