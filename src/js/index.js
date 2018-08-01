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
const Swipedetect = require('./utils/Swipedetect');

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
new Swipedetect({ container: document.querySelector('.containerMenu') })

storage.init( store.settings )
.then( response => {
  if( !response ) return alert("your browser is not supported");
  const { listWeather, settings } = response;
  pubsub.publish('init-app', listWeather );
  store.settings = settings;
  listWeather.forEach( item => pubsub.publish('create-card-weater', item ));
  pubsub.publish('set-current-settings', {settings: settings});
  pubsub.publish('update-all-weather-card');
});

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .then( response => {
    response.update();
  })
  .catch(error => {
    console.error(error)
  });
}