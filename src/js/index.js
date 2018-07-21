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

// alert('start app')
storage.init()
.then( list => {
  list = list || [];
  pubsub.publish('init-app', list );
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


// function func1(x) {
//   return new Promise((resolve,reject) => {
//     setTimeout(() => {
//       return resolve( x );
//     },1000)
//   });
// };
// function func2(x) {
//   return new Promise((resolve,reject) => {
//     setTimeout(() => {
//       return resolve( x );
//     },1500)
//   });
// };
// function func3(x) {
//   return new Promise((resolve,reject) => {
//     setTimeout(() => {
//       return reject('ERROR------');
//     },300)
//   });
// }

// async function add1( ) {
//   let a,b,c;
//   try{
//     a = await func1(1);
//     b = await func2(2);
//     c = await func3(3);

//   } catch( error ) {
//     // debugger
//     console.log( error )
//   }
//   // debugger
//   return a + b + c;
// }

// add1()
// .then(response => {
//   console.log(`response ${response}` );
// })
// .catch(error => {
//   console.log(`error ${error}`)
// });