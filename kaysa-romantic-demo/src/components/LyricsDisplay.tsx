import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LyricsLine } from '@/types/audio';

interface LyricsDisplayProps {
  currentLyric: LyricsLine | null;
  isActive?: boolean;
  className?: string;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({
  currentLyric,
  isActive = false,
  className = ''
}) => {
  const fadeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const fadeTransition = { duration: 0.6, ease: "easeOut" as const };

  if (!isActive) return null;

  return (
    <div className={`fixed bottom-8 left-0 right-0 z-20 px-8 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {currentLyric && (
            <motion.div
              key={currentLyric.timestamp}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeVariants}
              transition={fadeTransition}
              className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <motion.p
                className="text-2xl md:text-3xl lg:text-4xl font-elegant font-medium leading-relaxed"
                style={{ 
                  color: currentLyric.color || '#ff69b4',
                  fontSize: currentLyric.fontSize || 'inherit',
                  textShadow: `0 0 20px ${currentLyric.color || '#ff69b4'}40`
                }}
              >
                {currentLyric.text}
              </motion.p>
              
              {/* Animated underline */}
              <motion.div
                className="h-1 rounded-full mt-4 mx-auto"
                style={{ backgroundColor: currentLyric.color || '#ff69b4' }}
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background glow effect */}
        {currentLyric && (
          <motion.div
            className="absolute inset-0 rounded-2xl blur-2xl -z-10"
            style={{ 
              backgroundColor: `${currentLyric.color || '#ff69b4'}20`
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </div>
  );
};
