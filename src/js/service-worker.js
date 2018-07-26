const CACHE_NAME = ['v-11'];
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/dist/js/bundle.js',
  '/dist/css/bundle.css',
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

const updateCache = () => {
  console.log('sw updateCache');
  caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (CACHE_NAME.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
}

this.addEventListener('install', ( event ) => {
  console.log('sw install');
  event.waitUntil(
    caches.open( CACHE_NAME )
    .then(function(cache) {
      return cache.addAll( FILES_TO_CACHE );
    })
  );
});

this.addEventListener('fetch', ( event ) => {
  console.log('sw install fetch');
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetch(event.request);
    })
  );
});

updateCache();