import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FastForward, SkipForward, Pause, Play } from 'lucide-react';

interface AnimationControlsProps {
  isVisible?: boolean;
  onSpeedChange?: (speed: number) => void;
  onSkipToEnd?: () => void;
  currentSpeed?: number;
  isPaused?: boolean;
  onPauseToggle?: () => void;
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  isVisible = false,
  onSpeedChange,
  onSkipToEnd,
  currentSpeed = 1,
  isPaused = false,
  onPauseToggle
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 flex gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 flex gap-2 border border-gold-400/20">
        {/* Pause/Play Toggle */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onPauseToggle}
          className="w-10 h-10 p-0"
          title={isPaused ? "Resume animations" : "Pause animations"}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </Button>

        {/* Speed Controls */}
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={currentSpeed === 1 ? "primary" : "ghost"}
            onClick={() => onSpeedChange?.(1)}
            className="px-3 h-10"
            title="Normal speed"
          >
            1x
          </Button>
          <Button
            size="sm"
            variant={currentSpeed === 2 ? "primary" : "ghost"}
            onClick={() => onSpeedChange?.(2)}
            className="px-3 h-10"
            title="2x speed"
          >
            <FastForward className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={currentSpeed === 4 ? "primary" : "ghost"}
            onClick={() => onSpeedChange?.(4)}
            className="px-3 h-10"
            title="4x speed"
          >
            <FastForward className="w-4 h-4" />
            <FastForward className="w-4 h-4 -ml-2" />
          </Button>
        </div>

        {/* Skip to End */}
        <Button
          size="sm"
          variant="ghost"
          onClick={onSkipToEnd}
          className="w-10 h-10 p-0"
          title="Skip to lyrics"
        >
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
