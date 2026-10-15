import { fileURLToPath } from 'node:url';
import { resolve, sep } from 'node:path';
import sharp from 'sharp';
import { visit } from 'unist-util-visit';

async function reserveImageSpace(properties, publicDirectory) {
  const { src } = properties;
  if (typeof src !== 'string' || !src.startsWith('/') || src.startsWith('//')) return;
  if (Number(properties.width) > 0 && Number(properties.height) > 0) return;

  const pathname = decodeURIComponent(src.split(/[?#]/)[0]);
  const path = resolve(publicDirectory, `.${pathname}`);
  if (!path.startsWith(publicDirectory.endsWith(sep) ? publicDirectory : `${publicDirectory}${sep}`)) {
    throw new Error(`Article image path is outside public: ${src}`);
  }

  let dimensions;
  try {
    dimensions = await sharp(path).metadata();
    if (!(dimensions.width > 0 && dimensions.height > 0)) throw new Error('No intrinsic dimensions');
  } catch (cause) {
    throw new Error(`Cannot determine article image dimensions: ${src}`, { cause });
  }

  const width = Number(properties.width);
  const height = Number(properties.height);
  properties.width = width > 0 ? width : height > 0
    ? Math.max(1, Math.round(height * dimensions.width / dimensions.height)) : dimensions.width;
  properties.height = height > 0 ? height : width > 0
    ? Math.max(1, Math.round(width * dimensions.height / dimensions.width)) : dimensions.height;
}

/** Lazy-load images and reserve space for local public assets before they load. */
export function rehypeLazyImages({ publicDir = new URL('../../public/', import.meta.url) } = {}) {
  const publicDirectory = fileURLToPath(publicDir);
  return async (tree) => {
    const pending = [];
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'img') return;
      node.properties ||= {};
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';
      pending.push(reserveImageSpace(node.properties, publicDirectory));
    });
    await Promise.all(pending);
  };
}
