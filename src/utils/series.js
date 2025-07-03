/**
 * Get all posts in the same series as the current post
 * @param {Object} currentPost - The current post object
 * @param {Array} allPosts - Array of all blog posts
 * @returns {Array} Array of posts in the same series, sorted by part number
 */
export function getSeriesPosts(currentPost, allPosts) {
  if (!currentPost.data.series) {
    return [];
  }

  const seriesName = currentPost.data.series.name;
  
  return allPosts
    .filter(post => 
      post.data.series && 
      post.data.series.name === seriesName
    )
    .sort((a, b) => a.data.series.part - b.data.series.part);
}

/**
 * Get navigation info for a post within its series
 * @param {Object} currentPost - The current post object
 * @param {Array} seriesPosts - Array of all posts in the series
 * @returns {Object} Navigation info with previous/next and series metadata
 */
export function getSeriesNavigation(currentPost, seriesPosts) {
  if (!currentPost.data.series || seriesPosts.length === 0) {
    return null;
  }

  const currentIndex = seriesPosts.findIndex(post => post.slug === currentPost.slug);
  const previousPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  return {
    seriesName: currentPost.data.series.name,
    currentPart: currentPost.data.series.part,
    totalParts: seriesPosts.length,
    previousPost,
    nextPost,
    allPosts: seriesPosts
  };
}

/**
 * Get all unique series from blog posts
 * @param {Array} allPosts - Array of all blog posts
 * @returns {Array} Array of series with metadata
 */
export function getAllSeries(allPosts) {
  const seriesMap = new Map();

  allPosts.forEach(post => {
    if (post.data.series) {
      const seriesName = post.data.series.name;
      
      if (!seriesMap.has(seriesName)) {
        seriesMap.set(seriesName, {
          name: seriesName,
          posts: [],
          totalParts: 0
        });
      }
      
      seriesMap.get(seriesName).posts.push(post);
    }
  });

  // Sort posts within each series and calculate total parts
  return Array.from(seriesMap.values()).map(series => ({
    ...series,
    posts: series.posts.sort((a, b) => a.data.series.part - b.data.series.part),
    totalParts: series.posts.length
  }));
}