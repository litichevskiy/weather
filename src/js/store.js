const pubsub = new ( require('./utils/pubSub') );
const serverApi = require('./serverApi');
const storage = require('./storage');
const errorMessages = {
  unknow() { return `Oops! \n Something went wrong. \n Please try again`},
  unknowCiti(siti) { return `Weather for "${siti}" is not available`},
  weatherAdded(siti) {return `Weather for "${siti}" already exists`},
};

const store = {
  isShowBlockSearch: false,
  listSities: [],
  date: new Date,
  memoryCities: {},
  weatherFor: [],
  notFound: false,

  async addNewCiti( link, name, geonameid ) {
    let city, weather;
    try{
      city = await serverApi.getCity( link );
      if( !city ) throw new Error();
      const { latitude, longitude } = city['location']['latlon'];
      weather = await serverApi.getWeather(`(${latitude}, ${longitude})`);
      if( !weather ) throw new Error();
      weather = weather.query.results.channel;
      weather._name = name;
      weather.geonameid = geonameid;
    } catch( error ) {
      debugger
      console.log( error );
    }
    return weather;
  },

  async getWeather( coord ) {
    return await serverApi.getWeather( coord );
  },

  async updateWeatherCities() {
    let weatherList, response, coord, result = [];
    try{
      weatherList = await storage.getStorage();
      if( !weatherList ) throw new Error();
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
      debugger
      console.log( error );
      result = false;
    }
    return result;
  },

  setWeatherCard( response, num ) {
    const {astronomy,atmosphere,location,units,wind,item,lastBuildDate,_name,geonameid} = response;
    const condition = item.condition;
    const id = num || createId();
    const forecast = item.forecast.splice( 0, 6 );
    const coord = { lat: item.lat, long: item.long }
    return {
      coord,astronomy,atmosphere,location,units,wind,item:{condition,forecast},lastBuildDate,id,geonameid,_name
    };
  },

  async getCitiesBySubstring( substring ) {
    let response, list;
    try{
      response = await serverApi.getCitiesBySubstring( substring );
      if( !response ) throw new Error();
      list = response._embedded['city:search-results'];
      if( response.count > 0 ) this.memoryCities[substring] = list;
    } catch( error ) {
      debugger
      console.log( error );
    }
    return list;
  },

  init() {
    pubsub.subscribe('clicked-close-block-search', () => {
      this.isShowBlockSearch = !this.isShowBlockSearch;
      pubsub.publish('hide-block-search');
      pubsub.publish('create-list-cityes', []);
      this.memoryCities = {};
    });

    pubsub.subscribe('add-card-weather', () => {
      this.isShowBlockSearch = !this.isShowBlockSearch;
      pubsub.publish('show-block-search');
    });

    pubsub.subscribe('new-substring-on-search-cityes', ( data ) => {
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
        if( !response ) {
          pubsub.publish('show-message', {message: errorMessages.unknow()});
        }
        else if( !response.item ) {
          pubsub.publish('show-message',{message:errorMessages.unknowCiti(response._name)});
        }
        else{
          this.date = new Date;
          this.weatherFor.push( geoId );
          let weatherCard = this.setWeatherCard( response );
          pubsub.publish('create-card-weater', weatherCard );
          storage.setItem( weatherCard );
        }
      });
    });

    pubsub.subscribe('update-all-weather-card', () => {
      pubsub.publish('start-updated-all-weather-card');
      this.updateWeatherCities()
      .then( response => {
        pubsub.publish('end-updated-all-weather-card');
        if( !response ) {
          pubsub.publish('show-message', {message: errorMessages.unknow()});
        }
        else{
          response.forEach(item => {
            let id = item.id;
            let weatherCard = this.setWeatherCard( item, id );
            this.date = new Date;
            pubsub.publish('update-card-weater', weatherCard );
            storage.updateItem( id, weatherCard )
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
        const card = response[0];
        const index = this.weatherFor.indexOf( card.geonameid );
        if( index < 0 ) console.error(`nonexistent name ${card}`);
        else this.weatherFor.splice(index, 1);
      });
    });

    pubsub.subscribe('init-app', ( list ) => {
      this.weatherFor = list.map(item => item.geonameid);
    });
  }
};

store.init();
const createId = () => Date.now();
const getGeonameId = (str) => str.match(/geonameid:(\d{1,})\//)[1];

module.exports = store;