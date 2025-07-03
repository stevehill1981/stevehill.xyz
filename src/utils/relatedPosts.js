/**
 * Find related posts based on shared tags
 * @param {Object} currentPost - The current post object
 * @param {Array} allPosts - Array of all blog posts
 * @param {number} maxResults - Maximum number of related posts to return
 * @returns {Array} Array of related posts, sorted by relevance
 */
export function getRelatedPosts(currentPost, allPosts, maxResults = 3) {
  if (!currentPost.data.tags || currentPost.data.tags.length === 0) {
    // If no tags, return recent posts excluding current
    return allPosts
      .filter(post => post.slug !== currentPost.slug)
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .slice(0, maxResults);
  }

  const currentTags = currentPost.data.tags.map(tag => tag.toLowerCase());
  
  // Calculate similarity score for each post
  const postsWithScore = allPosts
    .filter(post => post.slug !== currentPost.slug) // Exclude current post
    .map(post => {
      if (!post.data.tags || post.data.tags.length === 0) {
        return { post, score: 0 };
      }
      
      const postTags = post.data.tags.map(tag => tag.toLowerCase());
      const sharedTags = currentTags.filter(tag => postTags.includes(tag));
      
      // Score based on number of shared tags and tag frequency
      const score = sharedTags.length / Math.max(currentTags.length, postTags.length);
      
      return { post, score, sharedTags };
    })
    .filter(item => item.score > 0) // Only posts with shared tags
    .sort((a, b) => {
      // Sort by score first, then by date (newer first)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime();
    });

  // If we don't have enough related posts, fill with recent posts
  const relatedPosts = postsWithScore.slice(0, maxResults);
  
  if (relatedPosts.length < maxResults) {
    const recentPosts = allPosts
      .filter(post => 
        post.slug !== currentPost.slug && 
        !relatedPosts.some(item => item.post.slug === post.slug)
      )
      .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
      .slice(0, maxResults - relatedPosts.length)
      .map(post => ({ post, score: 0, sharedTags: [] }));
      
    relatedPosts.push(...recentPosts);
  }
  
  return relatedPosts.map(item => item.post);
}