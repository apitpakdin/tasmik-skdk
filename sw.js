// ================================================================
//  SERVICE WORKER — Sistem Tasmik SK Datin Khadijah
//  Versi cache: v1.0
//  Fungsi: Simpan apps untuk guna offline
// ================================================================

const CACHE_NAME = 'tasmik-skdk-v1';

// Fail yang disimpan untuk offline
const FAIL_CACHE = [
  './index.html',
  './manifest.json'
];

// ── Pasang service worker & simpan cache ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Menyimpan fail untuk offline...');
      return cache.addAll(FAIL_CACHE);
    })
  );
  self.skipWaiting();
});

// ── Aktifkan & buang cache lama ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Membuang cache lama:', key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// ── Tangkap request — guna cache dulu, kemudian network ──
self.addEventListener('fetch', event => {
  // Jangan cache request ke Google Apps Script (API)
  if (event.request.url.includes('script.google.com')) {
    return; // Biar browser handle terus
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Ada dalam cache — guna terus (offline pun boleh)
        return cached;
      }
      // Tiada dalam cache — cuba ambil dari network
      return fetch(event.request).then(response => {
        // Simpan dalam cache untuk guna akan datang
        if (response && response.status === 200 && response.type === 'basic') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Tiada internet & tiada cache — tunjuk halaman offline
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
