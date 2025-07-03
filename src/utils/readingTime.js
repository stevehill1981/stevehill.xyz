export function getReadingTime(text) {
  if (!text || typeof text !== 'string') {
    return 1; // Default to 1 minute if no text
  }
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime); // Minimum 1 minute
}