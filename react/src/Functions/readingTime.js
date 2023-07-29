const calculateReadingTime = (wordCount) => {
  // Average reading speed in words per minute
  const wordsPerMinute = 200;

  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
};

export default calculateReadingTime;
