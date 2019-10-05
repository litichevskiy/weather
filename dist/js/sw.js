/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const CACHE_NAME = ['v-3-1570283757739'];
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

/***/ })
/******/ ]);