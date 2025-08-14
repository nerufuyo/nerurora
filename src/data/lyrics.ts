import { LyricsLine } from '@/types/audio';

// Note: Using placeholder lyrics - replace with actual licensed content
export const lyricsData: LyricsLine[] = [
  {
    timestamp: 0,
    text: "In this moment of love and light",
    duration: 3000,
    color: "#ff69b4"
  },
  {
    timestamp: 3000,
    text: "Your name echoes through my heart",
    duration: 3000,
    color: "#fbbf24"
  },
  {
    timestamp: 6000,
    text: "Kaysa, you are my inspiration",
    duration: 3000,
    color: "#c084fc"
  },
  {
    timestamp: 9000,
    text: "Every moment with you is magic",
    duration: 3000,
    color: "#00ff41"
  },
  {
    timestamp: 12000,
    text: "Together we create beautiful memories",
    duration: 3000,
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
