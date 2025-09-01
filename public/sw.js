// Lightweight Service Worker for caching /data/:letter.json and other assets
const CACHE_VERSION = "v1";
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const PRECACHE = `precache-${CACHE_VERSION}`;
const PRECACHE_URLS = ["/", "/index.html"];

// Helper: limit cache entries
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxItems);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                ![
                  PRECACHE,
                  RUNTIME_CACHE,
                  `precache-${CACHE_VERSION}`,
                ].includes(key)
            )
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Stale-while-revalidate for /data/*.json and simple runtime caching for other GET assets
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return; // only handle GETs

  const url = new URL(request.url);

  // Only handle same-origin requests (including dev) and the data path
  const isSameOrigin = url.origin === self.location.origin;
  const isDataRoute =
    url.pathname.startsWith("/data/") || url.pathname.endsWith(".json");

  if (isDataRoute && isSameOrigin) {
    // stale-while-revalidate
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        const networkPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              cache.put(request, networkResponse.clone());
              // keep runtime cache modest
              trimCache(RUNTIME_CACHE, 50);
            }
            return networkResponse;
          })
          .catch(() => null);

        // return cache if available, else wait for network
        return (
          cached ||
          networkPromise.then((res) => res || cached) ||
          new Response(null, { status: 504 })
        );
      })
    );
    return;
  }

  // For other same-origin GET requests (scripts, styles, images), try cache-first then network
  if (
    isSameOrigin &&
    (request.destination === "script" ||
      request.destination === "style" ||
      request.destination === "image")
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request)
          .then((res) => {
            if (res && res.ok) {
              caches
                .open(RUNTIME_CACHE)
                .then((cache) => cache.put(request, res.clone()));
            }
            return res;
          })
          .catch(() => cached || new Response(null, { status: 504 }));
      })
    );
    return;
  }

  // Default: do nothing (let browser handle)
});
