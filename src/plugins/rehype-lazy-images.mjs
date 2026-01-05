import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to add lazy loading and async decoding to images
 */
export function rehypeLazyImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        node.properties = node.properties || {};
        node.properties.loading = 'lazy';
        node.properties.decoding = 'async';
      }
    });
  };
}
