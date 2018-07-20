const pubsub = new ( require('./utils/pubSub') );
const store = require('./store');
const serverApi = require('./serverApi');
const storage = require('./storage');
const WeathersList = require('./components/WeathersList');
const offline = document.querySelector('.offline');
const Header = require('./components/Header');
const BlockSearch = require('./components/BlockSearch');
const InputSearch = require('./components/InputSearch');
const ListSities = require('./components/ListSities');
const Message = require('./components/Message');
const NotFound = require('./components/NotFound');

new BlockSearch({ container: document.querySelector('.blockSearch') });
new Header({ container: document.querySelector('.header') });
new ListSities({ container: document.querySelector('.listSities') });
new Message({ container: document.querySelector('.containerMessage') });
new WeathersList({ container: document.querySelector('.listCardWeater') });
new NotFound({
  container: document.querySelector('.containerNotFound'),
  eventName: 'cityes-not-found',
});

window.addEventListener('offline',() => {
  pubsub.publish('show-message', { message: `Connection state: \n offline` });
});

storage.init()
.then( list => {
  store.setCities( list );
  list = list || [];
  list.forEach( item => {
    pubsub.publish('create-card-weater', item );
  });
  console.log( 'storage ',  list )
  list.forEach( item => {
    const { city, region } = item.location;
    const place = `${city}, ${region}`;
    const id = item.id;
  //   serverApi.getWeather( place )
  //   .then( response => {
  //     let data = response.query.results.channel;
  //     data.id = id;
  //     pubsub.publish('update-card-weater', data );
  //     storage.updateItem( id, data )
  //   })
  //   .catch(error => console.log( error ));
  })
});

// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//     .register('/service-worker.js')
//     .then(function( registration ) {

//       registration.update();
//       console.log('Service Worker Registered');
//     })
//     .catch(error => console.error(error) )
// }