importScripts('./precache-manifest.js');
const scope = self.registration.scope;
const prefix = `lumascale:${scope}:`;
const cacheName = `${prefix}${self.LUMASCALE_BUILD.version}`;
const shell = new URL('index.html', scope).href;
const files = self.LUMASCALE_BUILD.files.map(file => new URL(file, scope).href);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(cacheName);
      await cache.addAll(files);
    } catch (error) {
      await caches.delete(cacheName);
      throw error;
    }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(prefix) && name !== cacheName).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || !url.href.startsWith(scope)) return;
  const isAsset = url.href.startsWith(new URL('assets/', scope).href) && !url.pathname.includes('/processed-preview/');
  if (request.mode !== 'navigate' && !files.includes(url.href) && !isAsset) return;
  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request.mode === 'navigate' ? shell : request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok && request.mode !== 'navigate') await cache.put(request, response.clone());
    return response;
  })());
});