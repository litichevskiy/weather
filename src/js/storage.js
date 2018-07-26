const localforage = require('localforage');
const STORAGE_NAME = 'storage_weather';

module.exports = {

  async setItem( data ) {
    let response;
    try{
      response = await this.getStorage();
      response.listWeather.push( data );
      response = await localforage.setItem( STORAGE_NAME, response )
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response;
    ///////////////////////////////////////////////////////////////////////
    // this.getStorage()
    // .then( response => {
    //   response.listWeather.push( data );
    //   localforage.setItem( STORAGE_NAME, response )
    //   .catch(error => console.error( error ));
    // })
  },

  getStorage() {
    return localforage.getItem( STORAGE_NAME )
    .then(response => response )
    .catch(error => console.log( error ));
  },

  async updateItem( id, newData ) {
    let response, index;
    try{
      response = await this.getStorage();
      response.listWeather.some( (item, i) => {
        if( item.id === id ) {
          index = i;
          return true;
        }
      });
      response.listWeather[index] = newData;
      response = await localforage.setItem( STORAGE_NAME, response );

    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response;
    //////////////////////////////////////////////////////////
    // return this.getStorage()
    // .then( storage => {
    //   let index;
    //   storage.listWeather.some( (item, i) => {
    //     if( item.id === id ) {
    //       index = i;
    //       return true;
    //     }
    //   })
    //   storage.listWeather[index] = newData;
    //   localforage.setItem( STORAGE_NAME, storage )
    //   .catch(error => console.error( error ));
    // })
    // .catch(error => console.log( error ));
  },

  async deleteItem( id ) {
    let response, index, card;

    try{
      response = await this.getStorage();
      response.listWeather.some( (item, i) => {
        if( item.id === id ) {
          index = i;
          return true;
        }
      });
      card = response.listWeather.splice( index, 1 );
      response = await localforage.setItem( STORAGE_NAME, response );

    } catch( error ) {
      console.log( error )
      card = false;
    }
    return card;
    ////////////////////////////////////////////
    // return this.getStorage()
    // .then( storage => {
    //   let index, card;
    //   storage.listWeather.some( (item, i) => {
    //     if( item.id === id ) {
    //       index = i;
    //       return true;
    //     }
    //   });
    //   card = storage.listWeather.splice( index, 1 );
    //   localforage.setItem( STORAGE_NAME, storage );
    //   return card;
    // })
    // .catch(error => console.error( error ));
  },

  async setSettings( settings ) {
    let response;
    try{
      response = await this.getStorage();
      response.settings = settings;
      response = await localforage.setItem( STORAGE_NAME, response )
    } catch( error ) {
      console.error( error );
    }
    return response;
  },

  async init( settings ) {
    let response;
    try{
      response = await this.getStorage();
      if( !response ) {
        response = await localforage.setItem( STORAGE_NAME, { settings: settings, listWeather:[] });
      }
    } catch( error ) {
      console.log( error );
      response = false;
    }
    return response;
//////////////////////////////////////////////////////////
    // return this.getStorage()
    // .then( response => {
    //   if( response ) return response;
    //   return localforage.setItem( STORAGE_NAME, { settings: settings, listWeather:[] })
    //   .then( response => response )
    //   .catch(error => console.log( error ) );
    // })
  }
}