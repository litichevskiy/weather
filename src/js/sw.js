const CACHE_NAME = ['v-1-1533051510913'];
const FILES_TO_CACHE = [
  '/',
  '/manifest.json',
  '/dist/js/bundle.js',
  '/dist/css/bundle.css',
  '/images/cancel.png',
  '/images/weather/clear.png',
  '/images/weather/cloudy.png',
  '/images/weather/fog.png',
  '/images/weather/partly-cloudy.png',
  '/images/weather/rain.png',
  '/images/weather/snow.png',
  '/images/weather/thunderstorm.png',
  '/images/weather/wind.png',
  '/images/poweredby.png',
  '/dist/fonts/MjQGmil5tffhpBrknsqsfamD.woff2',
  '/dist/fonts/MjQGmil5tffhpBrkntGsfamD.woff2',
  '/dist/fonts/MjQGmil5tffhpBrknt6sfQ.woff2',
];

self.addEventListener('activate', ( event ) => {
  event.waitUntil(
    caches.keys().then( keyList => {
      return Promise.all(keyList.map( key => {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('install', ( event ) => {
  event.waitUntil(
    caches.open( CACHE_NAME[0] )
    .then( cache => {
      return cache.addAll( FILES_TO_CACHE );
    })
  );
});

self.addEventListener('fetch', ( event ) => {
  event.respondWith(
    caches.match(event.request)
    .then( response => {
      return response || fetch(event.request);
    })
  );
});