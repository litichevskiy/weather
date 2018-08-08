const pubsub = new ( require('./utils/pubSub') );
const store = require('./store');
const serverApi = require('./serverApi');
const storage = require('./storage');
const WeathersList = require('./components/WeathersList');
const Header = require('./components/Header');
const BlockSearch = require('./components/BlockSearch');
const ListSities = require('./components/ListSities');
const Message = require('./components/Message');
const NotFound = require('./components/NotFound');
const Menu = require('./components/Menu');
const SavedCities = require('./components/SavedCities');

new BlockSearch({ container: document.querySelector('.blockSearch') });
new Header({ container: document.querySelector('.header') });
new ListSities({ container: document.querySelector('.listSities') });
new Message({ container: document.querySelector('.containerMessage') });
new WeathersList({ container: document.querySelector('.listCardWeater') });
new NotFound({
  container: document.querySelector('.containerNotFound'),
  eventName: 'cityes-not-found',
});
new Menu({
  container: document.querySelector('.containerMenu'),
  form: document.querySelector('.containerSettings'),
});
new SavedCities({container: document.querySelector('.blockSavedCities')} );

store.initApp();

// if('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js')
//   .then( response => {
//     // caches.keys().then( keyList => {
//     //   let lastIndex = keyList.length -1;

//     //   return Promise.all(keyList.map( ( key, index ) => {
//     //     if ( index === lastIndex ) {
//     //       console.log( key )
//     //       return caches.delete( key );
//     //     }
//     //   }));
//     // })
//     response.update();
//   })
//   .catch(error => {
//     console.error(error)
//   });
// }

// if('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./dist/service-worker.js')
//   .then( response => {
//     response.update();
//   })
//   .catch(error => {
//     console.error(error)
//   });
// }