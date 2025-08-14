import { LyricsLine } from '@/types/audio';

// Note: Using placeholder lyrics - replace with actual licensed content
export const lyricsData: LyricsLine[] = [
  {
    timestamp: 0,
    text: "In this moment of love and light",
    duration: 2000,
    color: "#ff69b4"
  },
  {
    timestamp: 2000,
    text: "Your name echoes through my heart",
    duration: 2000,
    color: "#fbbf24"
  },
  {
    timestamp: 4000,
    text: "Kaysa, you are my everything",
    duration: 2000,
    color: "#c084fc"
  },
  {
    timestamp: 6000,
    text: "Every moment with you is magic",
    duration: 2000,
    color: "#00ff41"
  },
  {
    timestamp: 8000,
    text: "Together we create beautiful memories",
    duration: 2000,
    color: "#ff69b4"
  }
];

export const getCurrentLyric = (currentTime: number): LyricsLine | null => {
  return lyricsData.find(
    lyric => currentTime >= lyric.timestamp && 
             currentTime < lyric.timestamp + lyric.duration
  ) || null;
};

export const getNextLyric = (currentTime: number): LyricsLine | null => {
  return lyricsData.find(lyric => lyric.timestamp > currentTime) || null;
};
