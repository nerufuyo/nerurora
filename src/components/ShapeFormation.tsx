import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParticles } from '@/hooks/useParticles';
import { ParticleConfig } from '@/types/particles';

interface ShapeFormationProps {
  shape: 'heart' | 'star' | 'fireworks';
  isActive?: boolean;
  duration?: number;
  onComplete?: () => void;
}

export const ShapeFormation: React.FC<ShapeFormationProps> = ({
  shape,
  isActive = false,
  duration = 1500,
  onComplete
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getParticleConfig = (): ParticleConfig => {
    const baseConfig = {
      count: 50,
      speed: { min: 0.5, max: 2 },
      size: { min: 2, max: 6 },
      gravity: 0.01,
      friction: 0.99
    };

    switch (shape) {
      case 'heart':
        return {
          ...baseConfig,
          color: ['#ff69b4', '#e91e63', '#fbbf24'],
          shape: 'heart' as const,
          count: 30
        };
      case 'star':
        return {
          ...baseConfig,
          color: ['#fbbf24', '#f59e0b', '#c084fc'],
          shape: 'star' as const,
          count: 25
        };
      case 'fireworks':
        return {
          ...baseConfig,
          color: ['#ff69b4', '#fbbf24', '#c084fc', '#00ff41'],
          shape: 'circle' as const,
          count: 80,
          speed: { min: 1, max: 4 }
        };
      default:
        return {
          ...baseConfig,
          color: '#ff69b4',
          shape: 'circle' as const
        };
    }
  };

  const { startParticles, stopParticles } = useParticles(canvasRef, getParticleConfig());

  useEffect(() => {
    if (isActive) {
      startParticles();
      
      const timer = setTimeout(() => {
        stopParticles();
        onComplete?.();
      }, duration);

      return () => {
        clearTimeout(timer);
        stopParticles();
      };
    }
  }, [isActive, duration, onComplete, startParticles, stopParticles]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-40 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </motion.div>
  );
};
