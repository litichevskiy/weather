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

  async updateAllWeather( list ) {
    let response, index;
    try{
      response = await this.getStorage();
      response.listWeather = list;
      response = await localforage.setItem( STORAGE_NAME, response );
      if( !response ) throw new Error('unknown error');
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return ( response ) ? response.listWeather : response;
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

  async setSettings( data ) {
    let response;
    try{
      response = await this.getStorage();
      response.settings[data.key] = data.value;
      response = await localforage.setItem( STORAGE_NAME, response )
    } catch( error ) {
      console.error( error );
    }
    return response;
  },

  async setCurrentSity( id ) {
    let response, isId, city;
    try{
      response = await this.getStorage();
      isId = response.listWeather.some( item => {
        if( item.id === id ) return city = item;
        else return false;
      });
      if( !isId ) throw new Error(`${id} unknow id`);
      else response.currentSity = id;
      response = await localforage.setItem( STORAGE_NAME, response )
    } catch( error ) {
      console.log( error );
      response = false;
    }

    return ( response ) ? {id: id, city: city} : false;
  },

  async init( settings ) {
    let response;
    try{
      response = await this.getStorage();
      if( !response ) {
        response = await localforage.setItem( STORAGE_NAME, { settings: settings, listWeather:[], currentSity: '' });
      }
    } catch( error ) {
      console.log( error );
      response = false;
    }
    return response;
  }
}