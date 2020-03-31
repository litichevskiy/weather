const CACHE_NAME = ['v-3-1585665579101'];
const FILES_TO_CACHE = [
  '/',
  '/manifest.json',
  '/dist/js/bundle.js',
  '/dist/vendors/vendors.js',
  '/dist/css/bundle.css',
  '/images/weather/tornado.png',
  '/images/weather/wind.png',
  '/images/weather/thunderstorm.png',
  '/images/weather/rain-and-snow.png',
  '/images/weather/freezing.png',
  '/images/weather/rain.png',
  '/images/weather/snow.png',
  '/images/weather/hail.png',
  '/images/weather/fog.png',
  '/images/weather/cloudy.png',
  '/images/weather/partly-cloudy.png',
  '/images/weather/sunny.png',
  '/images/weather/not-available.png',
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
  self.skipWaiting();
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