import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, SkipBack } from 'lucide-react';
import { AudioState } from '@/types/audio';
import { formatTime } from '@/utils/audioUtils';

interface AudioControllerProps {
  audioState: AudioState;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onVolumeChange: (volume: number) => void;
  isVisible?: boolean;
  className?: string;
}

export const AudioController: React.FC<AudioControllerProps> = ({
  audioState,
  onPlay,
  onPause,
  onStop,
  onVolumeChange,
  isVisible = true,
  className = ''
}) => {
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value);
    onVolumeChange(volume);
  };

  const toggleMute = () => {
    onVolumeChange(audioState.volume > 0 ? 0 : 0.5);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed top-4 right-4 z-30 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-4 border border-white/10 min-w-64">
        {/* Main Controls */}
        <div className="flex items-center gap-3 mb-3">
          <motion.button
            onClick={audioState.isPlaying ? onPause : onPlay}
            className="p-2 rounded-full bg-romantic-500 hover:bg-romantic-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!audioState.isLoaded}
          >
            {audioState.isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </motion.button>

          <motion.button
            onClick={onStop}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!audioState.isLoaded}
          >
            <SkipBack className="w-5 h-5 text-white" />
          </motion.button>

          <div className="flex-1 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>{formatTime(audioState.currentTime)}</span>
              <span>{formatTime(audioState.duration)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-romantic-500 to-gold-400"
              style={{
                width: audioState.duration > 0 
                  ? `${(audioState.currentTime / audioState.duration) * 100}%` 
                  : '0%'
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleMute}
            className="p-1 rounded hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {audioState.volume > 0 ? (
              <Volume2 className="w-4 h-4 text-gray-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-gray-300" />
            )}
          </motion.button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={audioState.volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer volume-slider"
          />

          <span className="text-xs text-gray-300 w-8 text-right">
            {Math.round(audioState.volume * 100)}
          </span>
        </div>

        {/* Loading State */}
        {!audioState.isLoaded && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="flex items-center gap-2 text-white text-sm">
              <div className="w-4 h-4 border-2 border-romantic-500 border-t-transparent rounded-full animate-spin" />
              Loading audio...
            </div>
          </div>
        )}

        {/* Error State */}
        {audioState.error && (
          <div className="mt-2 text-red-400 text-xs">
            {audioState.error}
          </div>
        )}
      </div>

      <style jsx>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff69b4;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
        }
        
        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff69b4;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
        }
      `}</style>
    </motion.div>
  );
};
