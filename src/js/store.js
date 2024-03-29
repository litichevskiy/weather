const LAST_UPDATE_TIME = 1800000; // ((1000 * 60) * 30) 30 min in ms
const pubsub = new ( require('./utils/pubSub') );
const serverApi = require('./serverApi');
const storage = require('./storage');
const units = {distance: "mi", pressure: "in", speed: "mph", temperature: "F"};
const errorMessages = {
  unknow( msg ) { return msg || `Oops! \n Something went wrong. \n Please try again`},
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
  currentCitiId: undefined,
  lastUpdateTime: undefined,
  invisibilityTime: 0,

  async addNewCiti( link, name, geonameid ) {
    let city, weather;
    try{
      name = name.split(',');
      name = `${name[0]},${name[2] || name[1]}`;

      weather = await serverApi.getWeather( name );
      if( !weather.status ) {
        showMessage('unknow', typeof weather.message === 'string' ? weather.message : errorMessages.unknow() );
        pubsub.publish('end-load-card-weather');
        if( this.currentCitiId ) this.setNewCity( this.currentCitiId );
        throw new Error( weather.message );
      }

      weather = weather.data;
      weather._name = name;
      weather.geonameid = geonameid;
    } catch( error ) {
      console.error( error );
      weather = false;
    }

    return weather;
  },

  async getWeatherForCity() {
    let weatherList, response;
    try{
      weatherList = await storage.getStorage();

      if( !weatherList ) throw new Error();
      weatherList = weatherList.listWeather;
      const itemWeather = getItemWeatherByKey( weatherList, 'id', this.currentCitiId );
      const cityName = itemWeather.location.nameAlfa2Iso ? itemWeather.location.nameAlfa2Iso : itemWeather._name
      response = await serverApi.getWeather( cityName );

      if( !response.status ) {
        showMessage('unknow', response.message );
        throw new Error( response.message );
      }

      response = response.data;
      response.id = itemWeather.id;
      response.geonameid = itemWeather.geonameid;
      response._name = itemWeather._name;
      response.fullName = itemWeather.fullName

    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response;
  },

  setWeatherCard( response, num ) {
    const { _name, location, geonameid, fullName } = response;
    const { astronomy, atmosphere, wind, localTime } = response.current_observation;
    const condition = response.current_observation.condition;
    const id = num || createId();
    const _updated = Date.now();
    const lastUpdate = new Date( response.current_observation.pubDate * 1000 ); //1000 because pubDate in seconds
    const forecast = response.forecasts;

    if ( response.fullName ) {
      location.regionFullName = response.fullName.split(',')[1];
      location.nameAlfa2Iso = `${location.city}, ${location.region}`;
    }
    return {
      units: units,
      astronomy, atmosphere,
      item:{ condition, forecast },
      location, wind, localTime,
      lastUpdate, id, geonameid, _name, _updated, fullName
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

  async getWeatherByISOCode ( fullName, geoId ) {
    return new Promise (( resolve, reject ) => {
        serverApi.getIsoAlpha( geoId )
        .then( isoAlpha  => {
          const cityName = fullName.match(/[a-zA-Z]+?,/i)[0];
          serverApi.getWeather( `${cityName} ${isoAlpha}`, geoId )
          .then( async ( response ) => {

            const data = await this.addNewCiti( undefined, `${cityName} ${isoAlpha}`, geoId );
            if ( !data.current_observation ) {
              showMessage('unknowCiti', data._name);
              pubsub.publish('show-block-search');
            }
            response.data.fullName = fullName
            resolve( response.data );
          });
        })
    });
  },

  init() {
    document.addEventListener('visibilitychange', () => {
      if( !document.hidden ) {
        if( Date.now() - this.invisibilityTime > LAST_UPDATE_TIME ) {
          this.updateWeather();
        }
      }
      else this.invisibilityTime = Date.now();
    }, false);

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
      .then( async (response) => {
        response.fullName = fullName;
        if( !response ) return showMessage('unknow' );
        let res;
        if( !response.current_observation ) {
          response = await this.getWeatherByISOCode( fullName, geoId );
          const { city, country } = response.location;
          response.fullName = fullName;
          response.geonameid = geoId;
          response._name = `${city}, ${country}`;
          if( !response.current_observation ) {
            showMessage('unknowCiti', response._name);
            pubsub.publish('show-block-search');
            if( this.currentCitiId ) this.setNewCity( this.currentCitiId );
          }

          return response;
        }

        return response;
      })
      .then(  response => {

        let weatherCard = this.setWeatherCard( response );
        storage.setItem( weatherCard )
        .then( response => {
          if( !response ) showMessage('unknow');
          else{
            this.lastUpdateTime = weatherCard._updated;
            this.weatherFor.push( geoId );

            pubsub.publish('end-load-card-weather');
            pubsub.publish('create-card-weater', weatherCard );
            pubsub.publish('create-list-saved-sities', [weatherCard] );
            this.changeCurrentCity( weatherCard.id );
          }
        })
      })
    });

    pubsub.subscribe('update-weather-card', () => {
      this.updateWeather();
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
          if( card.id === this.currentCitiId ) {
            this.currentCitiId = undefined;
            this.lastUpdateTime = undefined;
            pubsub.publish('delete-weather-card');
          }
          const index = this.weatherFor.indexOf( card.geonameid );
          if( index < 0 ) console.error(`non-existent geographical name ${card}`);
          else {
            this.weatherFor.splice(index, 1);
            if( !this.weatherFor.length ) pubsub.publish('hide-saved-cities');
          }
        }
      });
    });

    pubsub.subscribe('clicked-open-settings', () => {
      pubsub.publish('open-settings');
    });

    pubsub.subscribe('new-settings', ( data ) => {
      if( !this.settings[data.key] ) throw new Error(`${data.key} unknow value`);
      storage.setSettings( data )
      .then( response => {
        for( let key in response.settings ) {
          if( this.settings[key] !== response.settings[key] ) {
            this.settings[key] = response.settings[key];
            response.listWeather.some( item => {
              if ( item.id === this.currentCitiId ) {
                pubsub.publish(`update-units-${key}`, [item] );
                return true;
              }
              else return false;
            });
          }
        }
      });
    });

    pubsub.subscribe('clicked-saved-cities', () => {
      pubsub.publish('show-saved-cities');
    });

    pubsub.subscribe('change-current-city', ( data ) => {
      const { id } = data;
      if( !id ) {
        console.error(`unknow id ${id}`);
        showMessage('unknow');
      }
      if( this.currentCitiId === id ) return;
      this.setNewCity( id );
    });

    pubsub.subscribe('saved-cityes-closed', () => {
      if( this.currentCitiId ) return;
      storage.getStorage()
      .then( response => {
        const city = response.listWeather[0];
        if( city ) this.setNewCity( city.id );
      })
    });
  },

  setNewCity( id ) {
    storage.setCurrentSity( id )
    .then( response => {
      if( !response ) showMessage('unknow');
      this.currentCitiId = response.id;
      this.lastUpdateTime = response.city._updated;
      pubsub.publish('create-card-weater', response.city );
      const isUpdate = isTimeToUpdate( this.lastUpdateTime );
      if( isUpdate ) this.updateWeather();
    });
  },

  updateWeather() {
    if( !this.onlineStatus ) return showMessage('offline');
    pubsub.publish('start-updated-weather-card');
    this.getWeatherForCity()
    .then( response => {
      if( !response ) {
        pubsub.publish('end-updated-weather-card');
        return showMessage('unknow' );
      }
      else{
        response = this.setWeatherCard( response, response.id );

        storage.updateItemWeather( response )
        .then( response => {
          if( !response ) return showMessage('unknow');
          this.lastUpdateTime = response._updated;
          pubsub.publish('update-card-weater', response );
        })
        pubsub.publish('end-updated-weather-card');
      }
    });
  },

  changeCurrentCity( id ) {
    return storage.setCurrentSity( id )
    .then( response => {
      if( !response ) showMessage('unknow');
      this.currentCitiId = response.id;
      return this.currentCitiId;
    });
  },

  initApp() {
    storage.init( this.settings )
    .then( async response => {
      const { settings, listWeather } = response;
      this.settings = settings;
      this.weatherFor = listWeather.map(item => item.geonameid);
      this.isCardWeather = ( listWeather.length > 0 ) ? true : false;
      this.showHidePulsing( this.isCardWeather );

      if( response.currentSity ) this.currentCitiId = response.currentSity;
      if ( listWeather.length > 0 ) {

        if ( !this.currentCitiId ) await this.changeCurrentCity( listWeather[0].id )

        pubsub.publish('create-list-saved-sities', listWeather );
        const itemWeather = getItemWeatherByKey( listWeather, 'id', this.currentCitiId );
        this.lastUpdateTime = itemWeather._updated;
        pubsub.publish('create-card-weater', itemWeather );
        const isUpdate = isTimeToUpdate( this.lastUpdateTime );
        if( isUpdate ) this.updateWeather();
      }
      pubsub.publish('set-current-settings', {settings: settings});
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

const getItemWeatherByKey = ( list, key, id ) => {
  return list.reduce(( itemWeather, item ) => {
    if( item[key] === id ) itemWeather = item;
    return itemWeather;
  }, {});
};

const isTimeToUpdate = ( ms ) => ( Date.now() - ms ) > LAST_UPDATE_TIME;

module.exports = store;