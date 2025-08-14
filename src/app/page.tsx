'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MatrixEffect } from '@/components/MatrixEffect';
import { ShapeFormation } from '@/components/ShapeFormation';
import { TextReveal } from '@/components/TextReveal';
import { LyricsDisplay } from '@/components/LyricsDisplay';
import { AudioController } from '@/components/AudioController';
import { AnimationControls } from '@/components/AnimationControls';
import { Button } from '@/components/ui/Button';
import { useAudio } from '@/hooks/useAudio';
import { useAnimationSequence } from '@/hooks/useAnimationSequence';
import { getCurrentLyric } from '@/data/lyrics';
import { romanticQuotes, dedicationMessage } from '@/data/quotes';
import { ANIMATION_DURATIONS, AUDIO_CONFIG } from '@/lib/constants';
import { Heart, Play } from 'lucide-react';

type AnimationPhase = 'idle' | 'matrix' | 'heart' | 'star' | 'fireworks' | 'text' | 'lyrics' | 'complete';

export default function RomanticDemo() {
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>('idle');
  const [hasStarted, setHasStarted] = useState(false);
  const [showAudioController, setShowAudioController] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Audio setup - disabled for now to prevent 404 errors
  const audioConfig = {
    src: '', // Empty src to prevent loading attempts
    volume: AUDIO_CONFIG.DEFAULT_VOLUME,
    loop: AUDIO_CONFIG.LOOP,
    preload: false, // Prevent preloading
    autoplay: false
  };

  const audio = useAudio(audioConfig);
  const currentLyric = getCurrentLyric(audio.currentTime * 1000);

  // Animation sequence setup
  const animationPhases = [
    { id: 'matrix', duration: ANIMATION_DURATIONS.MATRIX_EFFECT, component: () => null },
    { id: 'heart', duration: ANIMATION_DURATIONS.SHAPE_FORMATION, component: () => null },
    { id: 'star', duration: ANIMATION_DURATIONS.SHAPE_FORMATION, component: () => null },
    { id: 'fireworks', duration: ANIMATION_DURATIONS.SHAPE_FORMATION, component: () => null },
    { id: 'text', duration: ANIMATION_DURATIONS.TEXT_REVEAL, component: () => null },
    { id: 'lyrics', duration: 0, component: () => null } // Infinite duration
  ];

  const { startSequence } = useAnimationSequence(animationPhases);

  // Start the entire experience
  const handleStart = useCallback(() => {
    setHasStarted(true);
    setCurrentPhase('matrix');
    startSequence();
    setShowAudioController(true);
    
    // Audio would start here when audio file is available
    // setTimeout(() => {
    //   audio.fadeIn(AUDIO_CONFIG.FADE_DURATION);
    // }, 1000);
  }, [startSequence, audio]);

  // Handle speed change
  const handleSpeedChange = useCallback((speed: number) => {
    setAnimationSpeed(speed);
  }, []);

  // Handle skip to end
  const handleSkipToEnd = useCallback(() => {
    setCurrentPhase('lyrics');
  }, []);

  // Handle pause toggle
  const handlePauseToggle = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  // Handle phase transitions
  const handlePhaseComplete = useCallback((phase: AnimationPhase) => {
    switch (phase) {
      case 'matrix':
        setCurrentPhase('heart');
        break;
      case 'heart':
        setCurrentPhase('star');
        break;
      case 'star':
        setCurrentPhase('fireworks');
        break;
      case 'fireworks':
        setCurrentPhase('text');
        break;
      case 'text':
        setCurrentPhase('lyrics');
        break;
      default:
        break;
    }
  }, []);

  // Randomly select a quote for text reveal
  const selectedQuote = romanticQuotes[0];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Start Screen */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center px-8 max-w-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Heart className="w-16 h-16 text-romantic-500 mx-auto mb-8 animate-pulse" />
                
                <h1 className="font-romantic text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-romantic-500 via-gold-400 to-magic-500 bg-clip-text text-transparent">
                  {dedicationMessage.title}
                </h1>
                
                <p className="font-elegant text-lg md:text-xl text-gold-300 mb-8">
                  {dedicationMessage.subtitle}
                </p>
                
                <p className="text-gray-300 text-sm md:text-base mb-12 leading-relaxed">
                  {dedicationMessage.message}
                </p>
                
                <Button
                  onClick={handleStart}
                  size="lg"
                  className="group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Begin Experience
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Effect */}
      <MatrixEffect
        isActive={currentPhase === 'matrix' && !isPaused}
        duration={ANIMATION_DURATIONS.MATRIX_EFFECT / animationSpeed}
        onComplete={() => handlePhaseComplete('matrix')}
      />

      {/* Shape Formations */}
      <ShapeFormation
        shape="heart"
        isActive={currentPhase === 'heart' && !isPaused}
        duration={ANIMATION_DURATIONS.SHAPE_FORMATION / animationSpeed}
        onComplete={() => handlePhaseComplete('heart')}
      />

      <ShapeFormation
        shape="star"
        isActive={currentPhase === 'star' && !isPaused}
        duration={ANIMATION_DURATIONS.SHAPE_FORMATION / animationSpeed}
        onComplete={() => handlePhaseComplete('star')}
      />

      <ShapeFormation
        shape="fireworks"
        isActive={currentPhase === 'fireworks' && !isPaused}
        duration={ANIMATION_DURATIONS.SHAPE_FORMATION / animationSpeed}
        onComplete={() => handlePhaseComplete('fireworks')}
      />

      {/* Text Reveal */}
      <TextReveal
        title="Kaysa"
        subtitle={selectedQuote.author}
        quote={selectedQuote.text}
        isActive={currentPhase === 'text' && !isPaused}
        duration={ANIMATION_DURATIONS.TEXT_REVEAL / animationSpeed}
        onComplete={() => handlePhaseComplete('text')}
      />

      {/* Lyrics Display */}
      <LyricsDisplay
        currentLyric={currentLyric}
        isActive={currentPhase === 'lyrics'}
      />

      {/* Animation Controls */}
      <AnimationControls
        isVisible={hasStarted}
        onSpeedChange={handleSpeedChange}
        onSkipToEnd={handleSkipToEnd}
        currentSpeed={animationSpeed}
        isPaused={isPaused}
        onPauseToggle={handlePauseToggle}
      />

      {/* Audio Controller */}
      <AudioController
        audioState={audio}
        onPlay={audio.play}
        onPause={audio.pause}
        onStop={audio.stop}
        onVolumeChange={audio.setVolume}
        isVisible={showAudioController}
      />

      {/* Background Elements */}
      {hasStarted && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Floating hearts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-romantic-500/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            >
              ♥
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
