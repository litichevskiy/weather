const pubsub = new ( require('./utils/pubSub') );
const serverApi = require('./serverApi');
const storage = require('./storage');
const TEXT_ERROR_MESSAGE = `Oops! \n Something went wrong. \n Please try again`;

const store = {
  isShowBlockSearch: false,
  listSities: [],
  weatherCardId: 0,
  date: new Date,
  memoryCities: {},

  setMemoryCities( data ) {
    if( !data.count ) return;
    let query = data._links.self.href.match(/=(.*)&/)[1];
    let list = data._embedded['city:search-results'];
    this.memoryCities[query] = list;
  },

  setCities( list ) {
    // debugger
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
      let substring = data.key;
      if ( !substring ) return pubsub.publish('create-list-cityes', []);
      if( this.memoryCities[substring] ) {
        this.listSities = this.memoryCities[substring];
        pubsub.publish('create-list-cityes', this.listSities);
        pubsub.publish('disabled-cityes-not-found');
        return;
      }

      this.listSities = [];
      pubsub.publish('create-list-cityes', this.listSities);
      pubsub.publish('start-load-list-sities');
      serverApi.getCitiesBySubstring( substring )
      .then( response => {

        this.setMemoryCities( response );

        this.listSities = response._embedded['city:search-results'];
        if( !this.listSities.length ) {
          pubsub.publish('enabled-cityes-not-found');
          pubsub.publish('stop-load-list-sities');
        }
        else{
          pubsub.publish('disabled-cityes-not-found');
          pubsub.publish('create-list-cityes', this.listSities);
          pubsub.publish('stop-load-list-sities');
        }
      })
      .catch(error => {
        debugger
        console.error(error)
        this.listSities = [];
        pubsub.publish('stop-load-list-sities');
        pubsub.publish('show-message', { message: TEXT_ERROR_MESSAGE });
        pubsub.publish('create-list-cityes', this.listSities);
        pubsub.publish('hide-block-search');
      });
    });

    pubsub.subscribe('selected-city', ( data ) => {
      this.memoryCities = {};
      let link = this.listSities[+data.index]['_links']['city:item']['href'];
      // let QQQ = this.listSities[+data.index]['matching_full_name']
      console.log( this.listSities[+data.index] )
      // debugger
      this.listSities = [];
      pubsub.publish('hide-block-search');
      pubsub.publish('create-list-cityes', this.listSities );
      pubsub.publish('start-load-card-weather');

      serverApi.getSity( link )
      .then( response => {
        let code = response._links['city:country']['href'];
        code = code.match(/[A-Z]{2}/)[0];
        // debugger
        console.log( response );
        console.log( `${response.name}, ${code}` );

        serverApi.getWeather( `${response.name}, ${code}` )
        .then( response => {
          let data = response.query.results.channel;
          data.id = this.weatherCardId++;

          // let _city = data.location.city;

          // debugger
          pubsub.publish('end-load-card-weather');
          pubsub.publish('create-card-weater', data );
          storage.setItem( data )
        })
        .catch(error => {
          debugger
          console.error(error)
          pubsub.publish('end-load-card-weather');
          pubsub.publish('show-message', { message: TEXT_ERROR_MESSAGE });
        });
      })
      .catch(error => {
        debugger
        console.error(error)
        pubsub.publish('end-load-card-weather');
        pubsub.publish('show-message', { message: TEXT_ERROR_MESSAGE });
      });
    });

    pubsub.subscribe('update-all-weather-card', () => {
      storage.getStorage()
      .then( response => {
        const length = response.length -1;
        let countUpdated = 0;
        response.forEach( item => {
          pubsub.publish('start-updated-all-weather-card')
          const { city, region } = item.location;
          const place = `${city}, ${region}`;
          const id = item.id;
            serverApi.getWeather( place )
            .then( response => {
              let data = response.query.results.channel;
              data.id = id;
              this.date = new Date;
              pubsub.publish('update-card-weater', data );
              if( countUpdated === length ) pubsub.publish('end-updated-all-weather-card');
              countUpdated++
              storage.updateItem( id, data )
            })
            .catch(error => {
              debugger
              console.error(error)
              pubsub.publish('show-message', { message: TEXT_ERROR_MESSAGE });
              pubsub.publish('end-updated-all-weather-card');
            });
        })
      })
      .catch(error => {
        debugger
        console.error(error)
        pubsub.publish('show-message', { message: TEXT_ERROR_MESSAGE });
        pubsub.publish('end-updated-all-weather-card');
      });
    });

    pubsub.subscribe('input-searh-cleared', () => {
      this.listSities = [];
      pubsub.publish('create-list-cityes', this.listSities);
    });

    pubsub.subscribe('delete-card', ( data ) => {
      const id = data.id;
      if( typeof id !== 'number' ) return console.error('id must be a number');
      storage.deleteItem( id );
    });
  }
};

store.init();

module.exports = store;