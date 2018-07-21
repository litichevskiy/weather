const localforage = require('localforage');
const STORAGE_NAME = 'storage_weather';

module.exports = {

  setItem( data ) {
    this.getStorage()
    .then( response => {
      response.push( data );
      localforage.setItem( STORAGE_NAME, response )
      .catch(error => console.error( error ));
    })
  },

  getStorage(  ) {
    return localforage.getItem( STORAGE_NAME )
    .then(response => response )
    .catch(error => console.log( error ));
  },

  updateItem( id, newData ) {
    return this.getStorage()
    .then( storage => {
      let index;
      storage.some( (item, i) => {
        if( item.id === id ) {
          index = i;
          return true;
        }
      })
      storage[index] = newData;
      localforage.setItem( STORAGE_NAME, storage )
      .catch(error => console.error( error ));
    })
    .catch(error => console.log( error ));
  },

  deleteItem( id ) {
    return this.getStorage()
    .then( storage => {
      let index, card;
      storage.some( (item, i) => {
        if( item.id === id ) {
          index = i;
          return true;
        }
      });
      card = storage.splice( index, 1 );
      localforage.setItem( STORAGE_NAME, storage );
      return card;
    })
    .catch(error => console.error( error ));
  },

  init() {
    return this.getStorage()
    .then( response => {
      if( response ) return response;
      localforage.setItem( STORAGE_NAME, [] )
      .then( response => response )
      .catch(error => console.log( error ) );
    })
  }
}