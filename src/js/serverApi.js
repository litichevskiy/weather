const serverApi = {
  getCitiesBySubstring( substring ) {
    if( !substring ) return Promise.reject(`substring can not be empty`);
    return fetch( `https://api.teleport.org/api/cities/?search=${substring}`)
    .then( response => {
      if( response.ok ) return response.json();
      else return Promise.reject( response );
    })
    .catch(error => {
      console.error(error);
      return Promise.reject( error );
    });
  },

  getCity( link ) {
    if( !link ) return Promise.reject(`link can not be empty`);
    return fetch( link )
    .then( response => {
      if( response.ok ) return response.json();
      else return Promise.reject(response);
    })
    .catch(error => {
      console.error(error);
      return Promise.reject( error );
    });
  },

  getWeather( coord ) {
    if( !coord ) return Promise.reject(`coord can not be empty`);
    const url = `https://query.yahooapis.com/v1/public/yql?q=`;
    let YQL = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${coord}")`;
    YQL = encodeURIComponent( YQL ) + `&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    return fetch( url + YQL )
    .then( response => {
      if( response.ok ) return response.json();
      else return Promise.reject(response);
    })
    .catch( error =>  {
      console.error(error);
      return Promise.reject( error );
    });
  }
};

module.exports = serverApi;