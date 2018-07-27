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
const Preloader = require('./components/Preloader');

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
// let preloader = new Preloader({ parent: document.querySelector('.preloaderApp')});
// preloader.enabled();

//////////////////////////
// add check storage.init
//////////////////////////
//////////////////////////
storage.init( store.settings )
.then( response => {
  if( !response ) return alert("your browser is not supported");
  store.settings = response.settings;
  pubsub.publish('set-current-settings', { settings:store.settings });
  const list = response.listWeather || [];
  const listLength = list.length;
  // if( listLength === 0 ) {
  //   preloader.deletePreloader()
  //   preloader = null;
  // }
  pubsub.publish('init-app', list );
  list.forEach( item => pubsub.publish('create-card-weater', item ));
  console.log( 'CARD ',  list )
  list.forEach( ( item, index ) => {
    const { city, region } = item.location;
    const place = `${city}, ${region}`;
    const id = item.id;
  //   serverApi.getWeather( place )
  //   .then( response => {
  //     let data = response.query.results.channel;
  //     data.id = id;
  //     pubsub.publish('update-card-weater', data );
  //     storage.updateItem( id, data )
          // if( index === listLength ) {
          //     debugger
          //   preloader.deletePreloader()
          //   preloader = null;
          // }
  //   })
  //   .catch(error => console.log( error ));
  })
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then( response => {
      response.update();
      console.log('Service Worker Registered');
    })
    .catch(error => {
      console.error(error)
    })
}
