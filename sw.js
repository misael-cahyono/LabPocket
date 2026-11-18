const CACHE_NAME = 'labpocket-v1';
const urlsToCache = [
  'index.html',
  'student-dashboard.html',
  'teacher-dashboard.html',
  'css/style.css',
  'css/dashboard.css',
  'js/app.js',
  'js/student.js',
  'js/teacher.js',
  'js/notifications.js',
  'js/three.min.js',
  'manifest.json'
];

// 1. Saat Service Worker dipasang (Install), simpan file ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache berhasil dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Mengatur permintaan jaringan (Fetch) dengan strategi Cache-First
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, kembalikan file cache. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});

// 3. Membersihkan cache lama saat ada pembaruan versi aplikasi
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
