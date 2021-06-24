const CACHE_NAME = ['v-4-1624557353509'];
const FILES_TO_CACHE = [
  '/',
  '/manifest.json',
  '/dist/js/bundle.js',
  '/dist/vendors/vendors.js',
  '/dist/css/bundle.css',
  '/images/weather/broken-clouds.png',
  '/images/weather/clear-sky.png',
  '/images/weather/drizzle.png',
  '/images/weather/few-clouds.png',
  '/images/weather/flurries.png',
  '/images/weather/freezing-fog.png',
  '/images/weather/freezing-rain.png',
  '/images/weather/haze.png',
  '/images/weather/heavy-rain.png',
  '/images/weather/light-rain.png',
  '/images/weather/light-shower-rain.png',
  '/images/weather/light-snow.png',
  '/images/weather/mist.png',
  '/images/weather/mix-snow-rain.png',
  '/images/weather/overcast-clouds.png',
  '/images/weather/sand-dust.png',
  '/images/weather/smoke.png',
  '/images/weather/snow-shower.png',
  '/images/weather/snow.png',
  '/images/weather/thunderstorm-with-rain.png',
  '/images/favicon.ico',
  '/images/icons/icon-144x144.png',
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