export const romanticQuotes = [
  {
    text: "Love is not just looking at each other, it's looking in the same direction together.",
    author: "Inspired by Antoine de Saint-Exupéry",
    color: "#ff69b4"
  },
  {
    text: "In your eyes, I found my home, in your heart, I found my love.",
    author: "Original",
    color: "#fbbf24"
  },
  {
    text: "You are my today and all of my tomorrows.",
    author: "Original",
    color: "#c084fc"
  },
  {
    text: "Every love story is beautiful, but ours is my favorite.",
    author: "Original",
    color: "#00ff41"
  },
  {
    text: "Kaysa, you make ordinary moments extraordinary.",
    author: "Written for you",
    color: "#ff69b4"
  }
];

export const getRandomQuote = () => {
  return romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
};

export const dedicationMessage = {
  title: "For Kaysa",
  subtitle: "With all my love",
  message: "This digital symphony of lights and sounds is created especially for you. Every particle, every note, every color represents a moment of joy you bring to my life."
};
