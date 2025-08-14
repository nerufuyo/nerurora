import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  title: string;
  subtitle?: string;
  quote?: string;
  author?: string;
  isActive?: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  title,
  subtitle,
  quote,
  author,
  isActive = false,
  onComplete,
  duration = 4000
}) => {
  const textVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.1 }
    }
  };

  const textTransition = { duration: 0.8, ease: "easeOut" as const };

  React.useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, duration]);

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={staggerVariants}
    >
      <div className="text-center px-8 max-w-4xl">
        {/* Main Title */}
        <motion.h1
          className="font-romantic text-6xl md:text-8xl lg:text-9xl font-bold mb-8 bg-gradient-to-r from-romantic-500 via-gold-400 to-magic-500 bg-clip-text text-transparent animate-glow"
          variants={textVariants}
          transition={textTransition}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="font-elegant text-xl md:text-2xl lg:text-3xl text-gold-300 mb-12 animate-float"
            variants={textVariants}
            transition={textTransition}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Quote */}
        {quote && (
          <motion.div
            className="space-y-4"
            variants={textVariants}
            transition={textTransition}
          >
            <blockquote className="font-elegant text-lg md:text-xl lg:text-2xl text-romantic-200 italic leading-relaxed">
              &ldquo;{quote}&rdquo;
            </blockquote>
            {author && (
              <cite className="block text-magic-300 text-sm md:text-base font-medium">
                — {author}
              </cite>
            )}
          </motion.div>
        )}

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
          variants={textVariants}
          transition={textTransition}
        >
          <div className="w-96 h-96 bg-gradient-to-r from-romantic-500/20 via-gold-400/20 to-magic-500/20 rounded-full blur-3xl animate-pulse" />
        </motion.div>

        {/* Sparkle Effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          variants={textVariants}
          transition={textTransition}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gold-400 rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
