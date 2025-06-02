const CACHE_NAME = 'picgenie-single-cache-v4';
const ASSETS = ['/', 'index.html', 'styles.css', 'app.js', 'manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
