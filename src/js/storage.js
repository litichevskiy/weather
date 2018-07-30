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
  }
}