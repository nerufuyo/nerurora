import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MatrixRainEffect } from '@/utils/particleSystem';

interface MatrixEffectProps {
  duration?: number;
  onComplete?: () => void;
  isActive?: boolean;
}

export const MatrixEffect: React.FC<MatrixEffectProps> = ({
  duration = 2000,
  onComplete,
  isActive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matrixEffectRef = useRef<MatrixRainEffect | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !isActive) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    matrixEffectRef.current = new MatrixRainEffect(canvas);
    matrixEffectRef.current.start();

    // Start color transition after 1 second
    const colorTransitionTimer = setTimeout(() => {
      if (matrixEffectRef.current) {
        matrixEffectRef.current.updateColor('#ff69b4');
      }
    }, 1000);

    // Start fade out before completion
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 500);

    // Complete the effect
    const completeTimer = setTimeout(() => {
      matrixEffectRef.current?.stop();
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(colorTransitionTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      matrixEffectRef.current?.stop();
    };
  }, [duration, onComplete, isActive]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'black' }}
      />
      
      {/* Overlay gradient for smooth transition */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0 : 0.7 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};
