const pubsub = new ( require('./utils/pubSub') );
const serverApi = require('./serverApi');
const storage = require('./storage');
const errorMessages = {
  unknow() { return `Oops! \n Something went wrong. \n Please try again`},
  unknowCiti(siti) { return `Weather for "${siti}" is not available`},
  weatherAdded(siti) {return `Weather for "${siti}" already exists`},
  offline() {return `Connection state: \n offline`},
};

const store = {
  settings: {temperature: 'c', speed: 'km', timeFormat:'24'},
  isShowBlockSearch: false,
  listSities: [],
  memoryCities: {},
  weatherFor: [],
  notFound: false,
  onlineStatus: navigator.onLine || window.navigator.onLine,
  isCardWeather: undefined,

  async addNewCiti( link, name, geonameid ) {
    if( !link ) return console.error(`link ${link} can not be empty`);
    let city, weather;
    try{
      city = await serverApi.getCity( link );
      if( !city ) throw new Error();
      const { latitude, longitude } = city['location']['latlon'];
      if( !latitude || !longitude ) {
        return console.error(`latitude ${latitude} and longitude ${longitude} can not be empty`);
      }
      weather = await serverApi.getWeather(`(${latitude}, ${longitude})`);
      if( !weather ) throw new Error();
      weather = weather.query.results.channel;
      weather._name = name;
      weather.geonameid = geonameid;
    } catch( error ) {
      console.error( error );
      weather = false;
    }
    return weather;
  },

  async getWeather( coord ) {
    if( !coord ) return console.error(`coord ${coord} can not be empty`);
    return await serverApi.getWeather( coord );
  },

  async updateWeatherCities() {
    let weatherList, response, coord, result = [];
    try{
      weatherList = await storage.getStorage();
      if( !weatherList ) throw new Error();
      weatherList = weatherList.listWeather;
      for( let item of weatherList ) {
        coord = item.coord;
        response = await this.getWeather(`(${coord.lat}, ${coord.long})`);
        if( !response ) throw new Error();
        response = response.query.results.channel;
        response.id = item.id;
        response.geonameid = item.geonameid;
        response._name = item._name;
        result.push( response );
      }
    } catch( error ) {
      console.log( error );
      result = false;
    }
    return result;
  },

  setWeatherCard( response, num ) {
    const {
      astronomy,
      atmosphere,
      location,
      units,
      wind,
      item,
      _name,
      geonameid
    } = response;
    const condition = item.condition;
    const id = num || createId();
    const lastUpdate = new Date;
    const forecast = item.forecast.splice( 0, 6 );
    const coord = { lat: item.lat, long: item.long }
    return {
      coord, astronomy, atmosphere,
      location, units ,wind, item:{ condition, forecast },
      lastUpdate, id, geonameid, _name
    };
  },

  async getCitiesBySubstring( substring ) {
    if( !substring ) return console.error('substring can not be empty');
    let response, list;
    try{
      response = await serverApi.getCitiesBySubstring( substring );
      if( !response ) throw new Error();
      list = response._embedded['city:search-results'];
      if( response.count > 0 ) this.memoryCities[substring] = list;
    } catch( error ) {
      console.error( error );
    }
    return list;
  },

  showHidePulsing( bol ) {
    if( bol ) {
      (document.querySelector('.pulsingContainer')).style.display = 'none';
      this.isCardWeather = true;
    }
    else{
     (document.querySelector('.pulsingContainer')).style.display = 'block';
      this.isCardWeather = false;
    }
  },

  init() {
    window.addEventListener('online', () => {
      this.onlineStatus = true;
    });
    window.addEventListener('offline', () => {
      this.onlineStatus = false;
      this.listSities = [];
      this.memoryCities = {};
      pubsub.publish('create-list-cityes', this.listSities );
      pubsub.publish('show-message', {message: errorMessages.offline()});
    });

    pubsub.subscribe('clicked-close-block-search', () => {
      this.isShowBlockSearch = !this.isShowBlockSearch;
      pubsub.publish('hide-block-search');
      pubsub.publish('disabled-cityes-not-found');
      pubsub.publish('create-list-cityes', []);
      this.memoryCities = {};
    });

    pubsub.subscribe('add-card-weather', () => {
      this.isShowBlockSearch = !this.isShowBlockSearch;
      pubsub.publish('show-block-search');
      if( !this.isCardWeather ) this.showHidePulsing( true );
    });

    pubsub.subscribe('new-substring-on-search-cityes', ( data ) => {
      if( !this.onlineStatus ) return showMessage('offline');
      pubsub.publish('disabled-cityes-not-found');
      this.notFound = false;
      let substring = data.key;
      if ( !substring ) pubsub.publish('create-list-cityes', []);
      else if( this.memoryCities[substring] ) {
        this.listSities = this.memoryCities[substring];
        pubsub.publish('create-list-cityes', this.listSities);
      }
      else{
        this.listSities = [];
        pubsub.publish('create-list-cityes', this.listSities);
        pubsub.publish('start-load-list-sities');
        this.getCitiesBySubstring( substring )
        .then( response => {
          pubsub.publish('stop-load-list-sities');
          if( !response ) {
            pubsub.publish('hide-block-search');
            pubsub.publish('show-message', { message: errorMessages.unknow() });
          }
          else if( response.length > 0 ) {
            this.listSities = response;
            pubsub.publish('create-list-cityes', this.listSities);
          }
          else if( response.length < 1 ) {
            pubsub.publish('enabled-cityes-not-found');
            this.notFound = true;
          }
        });
      }
    });

    pubsub.subscribe('selected-city', ( data ) => {
      if( this.notFound ) return;
      this.memoryCities = {};
      let selectedSiti = this.listSities[+data.index];
      let link = selectedSiti['_links']['city:item']['href'];
      let geoId = getGeonameId( link );
      let fullName = selectedSiti['matching_full_name'];
      this.listSities = [];
      pubsub.publish('hide-block-search');
      pubsub.publish('create-list-cityes', this.listSities );
      if ( this.weatherFor.includes( geoId ) ) {
        pubsub.publish('show-message', {message: errorMessages.weatherAdded( fullName )});
        return;
      }
      pubsub.publish('start-load-card-weather');
      this.addNewCiti( link, fullName, geoId )
      .then(response => {
        pubsub.publish('end-load-card-weather');
        if( !response ) return showMessage('unknow');
        if( !response.item ) return showMessage('unknowCiti', response._name)
        else{
          let weatherCard = this.setWeatherCard( response );
          storage.setItem( weatherCard )
          .then( response => {
            if( !response ) showMessage('unknow');
            else{
              this.weatherFor.push( geoId );
              pubsub.publish('create-card-weater', weatherCard );
            }
          });
        }
      });
    });

    pubsub.subscribe('update-all-weather-card', () => {
      if( !this.onlineStatus ) return showMessage('offline');
      pubsub.publish('start-updated-all-weather-card');
      this.updateWeatherCities()
      .then( response => {
        pubsub.publish('end-updated-all-weather-card');
        if( !response ) return showMessage('unknow');
        else{
          response.forEach(item => {
            let id = item.id;
            let weatherCard = this.setWeatherCard( item, id );
            storage.updateItem( id, weatherCard )
            .then( response => {
              if( !response ) return showMessage('unknow');
              else pubsub.publish('update-card-weater', weatherCard );
            })
          });
        }
      });
    });

    pubsub.subscribe('input-searh-cleared', () => {
      this.listSities = [];
      pubsub.publish('create-list-cityes', this.listSities);
    });

    pubsub.subscribe('delete-card', ( data ) => {
      const id = data.id;
      if( typeof id !== 'number' ) return console.error('id must be a number');
      storage.deleteItem( id )
      .then( response => {
        if( !response ) showMessage('unknow');
        else{
          const card = response[0];
          const index = this.weatherFor.indexOf( card.geonameid );
          if( index < 0 ) console.error(`nonexistent name ${card}`);
          else this.weatherFor.splice(index, 1);
        }
      });
    });

    pubsub.subscribe('init-app', ( list ) => {
      this.weatherFor = list.map(item => item.geonameid);
      this.isCardWeather = ( list.length > 0 ) ? true : false;
      this.showHidePulsing( this.isCardWeather );
    });

    pubsub.subscribe('clicked-open-settings', () => {
      pubsub.publish('open-settings');
    });

    pubsub.subscribe('new-settings', ( data ) => {
      storage.setSettings( data )
      .then( response => {

        for( let key in response.settings ) {
          if( this.settings[key] !== response.settings[key] ) {
            this.settings[key] = response.settings[key];
            pubsub.publish(`update-units-${key}`, response.listWeather );
          }
        }
      });
    });
  }
};

store.init();

const showMessage = ( key, message ) => {
  if( message ) pubsub.publish('show-message', {message: errorMessages[key](message)});
  else pubsub.publish('show-message', { message: errorMessages[key]() });
};
const createId = () => Date.now();
const getGeonameId = (str) => str.match(/geonameid:(\d{1,})\//)[1];

module.exports = store;