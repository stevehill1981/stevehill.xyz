import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const worker = await readFile(new URL('../public/sw.js', import.meta.url), 'utf8');
const origin = 'https://www.stevehill.xyz';
const oldPage = '<link rel="stylesheet" href="/_astro/removed.css">';
const currentPage = '<link rel="stylesheet" href="/_astro/current.css">';

function harness(initial = {}) {
  const entries = new Map(Object.entries(initial).map(([path, body]) => [
    new URL(path, origin).href,
    new Response(body),
  ]));
  const handlers = new Map();
  let network = async () => new Response(currentPage, {
    headers: { 'Content-Type': 'text/html' },
  });
  const key = request => new URL(typeof request === 'string' ? request : request.url, origin).href;
  vm.runInNewContext(worker, {
    URL,
    self: {
      location: { origin },
      addEventListener: (name, handler) => handlers.set(name, handler),
    },
    caches: {
      match: async request => entries.get(key(request))?.clone(),
      open: async () => ({
        put: async (request, response) => entries.set(key(request), response.clone()),
      }),
    },
    fetch: request => network(request),
  });
  return {
    entries,
    setNetwork: implementation => { network = implementation; },
    dispatch(path, options = {}) {
      const request = new Request(new URL(path, origin), options);
      let response;
      handlers.get('fetch')({ request, respondWith: value => { response = value; } });
      return response;
    },
  };
}

for (const path of ['/about', '/about/', '/about.html']) {
  test(`client navigation uses current HTML for ${path}`, async () => {
    const h = harness({ [path]: oldPage });
    // ClientRouter fetches do not send the browser navigation Accept header.
    const response = await h.dispatch(path, { headers: { Accept: '*/*' } });
    assert.equal(await response.text(), currentPage);
    assert.equal(await h.entries.get(new URL(path, origin).href).text(), currentPage);
  });
}

test('client navigation and a full document load return the same release', async () => {
  const h = harness({ '/about': oldPage });
  const client = await h.dispatch('/about', { headers: { Accept: '*/*' } });
  const document = await h.dispatch('/about', { headers: { Accept: 'text/html' } });
  assert.equal(await client.text(), await document.text());
});

test('offline client navigation serves the last successfully fetched page', async () => {
  const h = harness({ '/about': oldPage });
  await h.dispatch('/about', { headers: { Accept: '*/*' } });
  h.setNetwork(async () => { throw new Error('offline'); });
  const response = await h.dispatch('/about', { headers: { Accept: '*/*' } });
  assert.equal(await response.text(), currentPage);
});

test('an uncached page falls back to the offline document', async () => {
  const h = harness({ '/offline': 'Offline content' });
  h.setNetwork(async () => { throw new Error('offline'); });
  const response = await h.dispatch('/new-page', { headers: { Accept: '*/*' } });
  assert.equal(await response.text(), 'Offline content');
});

test('an unsuccessful response cannot overwrite a good cached page', async () => {
  const h = harness({ '/about': oldPage });
  h.setNetwork(async () => new Response('Not found', { status: 404 }));
  const response = await h.dispatch('/about', { headers: { Accept: '*/*' } });
  assert.equal(response.status, 404);
  assert.equal(await h.entries.get(`${origin}/about`).text(), oldPage);
});

test('hashed assets retain cache-first behavior', async () => {
  const h = harness({ '/_astro/site.123.css': 'cached CSS' });
  h.setNetwork(async () => new Response('network CSS'));
  const response = await h.dispatch('/_astro/site.123.css');
  assert.equal(await response.text(), 'cached CSS');
});

for (const [path, options] of [
  ['https://example.com/about', {}],
  ['/about', { method: 'POST' }],
  ['/pagefind/pagefind-ui.js', {}],
]) {
  test(`does not intercept ${options.method ?? 'GET'} ${path}`, () => {
    const h = harness();
    assert.equal(h.dispatch(path, options), undefined);
  });
}
