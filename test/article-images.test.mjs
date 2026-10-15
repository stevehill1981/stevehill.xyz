import test from 'node:test';
import assert from 'node:assert/strict';
import { rehypeLazyImages } from '../src/plugins/rehype-lazy-images.mjs';

function image(properties) {
  const node = { type: 'element', tagName: 'img', properties, children: [] };
  return { node, tree: { type: 'root', children: [node] } };
}

test('public raster images reserve their intrinsic aspect ratio', async () => {
  const { node, tree } = image({ src: '/assets/images/all-black.png', alt: 'black screen' });
  await rehypeLazyImages()(tree);
  assert.equal(node.properties.width, 1504);
  assert.equal(node.properties.height, 1228);
  assert.equal(node.properties.alt, 'black screen');
  assert.equal(node.properties.loading, 'lazy');
  assert.equal(node.properties.decoding, 'async');
});

test('SVG viewBox dimensions reserve space too', async () => {
  const { node, tree } = image({ src: '/images/blog/npm-link-flow.svg' });
  await rehypeLazyImages()(tree);
  assert.equal(node.properties.width, 400);
  assert.equal(node.properties.height, 300);
});

test('authored dimensions remain authoritative', async () => {
  const { node, tree } = image({ src: '/assets/images/all-black.png', width: 752, height: 614 });
  await rehypeLazyImages()(tree);
  assert.equal(node.properties.width, 752);
  assert.equal(node.properties.height, 614);
});

test('one authored dimension scales the other without changing the ratio', async () => {
  const { node, tree } = image({ src: '/assets/images/all-black.png', width: 752 });
  await rehypeLazyImages()(tree);
  assert.equal(node.properties.width, 752);
  assert.equal(node.properties.height, 614);
});

test('remote images are not read or fetched', async () => {
  for (const src of ['https://example.invalid/image.png', '//example.invalid/image.png', 'data:image/png;base64,']) {
    const { node, tree } = image({ src });
    await rehypeLazyImages()(tree);
    assert.equal(node.properties.width, undefined);
    assert.equal(node.properties.height, undefined);
  }
});

test('missing local images fail rather than silently losing reserved space', async () => {
  const { tree } = image({ src: '/assets/images/does-not-exist.png' });
  await assert.rejects(async () => rehypeLazyImages()(tree));
});

test('local paths cannot escape the public directory', async () => {
  const { tree } = image({ src: '/%2e%2e/package.json' });
  await assert.rejects(async () => rehypeLazyImages()(tree), /outside public/);
});
