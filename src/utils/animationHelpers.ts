import { TransitionConfig } from '@/types/animation';

export const createStaggerVariants = (delay: number = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay,
      delayChildren: 0.1
    }
  }
});

export const createFadeInVariants = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
};

export const createScaleVariants = () => ({
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
});

export const createTextRevealVariants = () => ({
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
});

export const createFloatingVariants = () => ({
  floating: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
});

export const createGlowVariants = () => ({
  glow: {
    textShadow: [
      '0 0 10px currentColor',
      '0 0 20px currentColor, 0 0 30px currentColor',
      '0 0 10px currentColor'
    ],
    transition: {
      duration: 2,
      ease: 'easeInOut',
      repeat: Infinity
    }
  }
});

export const createSpringTransition = (
  stiffness: number = 100,
  damping: number = 10,
  mass: number = 1
): TransitionConfig => ({
  type: 'spring',
  stiffness,
  damping,
  mass
});

export const createTweenTransition = (
  duration: number = 0.5,
  ease: string = 'easeOut'
): TransitionConfig => ({
  type: 'tween',
  duration,
  ease
});

export const easeInOut = [0.4, 0, 0.2, 1];
export const easeOut = [0, 0, 0.2, 1];
export const easeIn = [0.4, 0, 1, 1];
export const bounce = [0.68, -0.55, 0.265, 1.55];

export const delays = {
  fast: 0.1,
  normal: 0.2,
  slow: 0.3
};

export const durations = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2
};
