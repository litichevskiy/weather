const store = require('./store');
const WeatherCard = require('./components/WeatherCard');
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
new WeatherCard({ container: document.querySelector('.listCardWeater') });
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

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
  .catch(error => console.error(error) );
}