!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:s})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t){const n=["v-1-1532987273564"],s=["/","/manifest.json","/dist/js/bundle.js","/dist/css/bundle.css","/images/cancel.png","/images/weather/clear.png","/images/weather/cloudy.png","/images/weather/fog.png","/images/weather/partly-cloudy.png","/images/weather/rain.png","/images/weather/snow.png","/images/weather/thunderstorm.png","/images/weather/wind.png","/images/poweredby.png","/dist/fonts/MjQGmil5tffhpBrknsqsfamD.woff2","/dist/fonts/MjQGmil5tffhpBrkntGsfamD.woff2","/dist/fonts/MjQGmil5tffhpBrknt6sfQ.woff2"];self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>{if(-1===n.indexOf(e))return caches.delete(e)}))))}),self.addEventListener("install",e=>{e.waitUntil(caches.open(n[0]).then(e=>e.addAll(s)))}),self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(t=>t||fetch(e.request)))})}]);