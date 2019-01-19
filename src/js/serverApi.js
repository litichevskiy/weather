const axios = require('axios');
const LIMIT_CITIES_BY_SUBSTRING = 18;// max - 25

const serverApi = {
  async getCitiesBySubstring( substring ) {
    let response;
    let url = `https://api.teleport.org/api/cities/?search=${substring}&limit=${LIMIT_CITIES_BY_SUBSTRING}`;
    try{
      response = await getServerData (url );
      if( response.status !== 200 ) throw new Error('unknow error');
    } catch( error ) {
      console.error( error )
      response = false;
    }
    return response.data || false;
  },

  async getCity( link ) {
    let response;
    try{
      response = await getServerData( link );
      if( response.status !== 200 ) throw new Error('unknow error');
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response.data || false;
  },

  // async getWeather( place ) {
  //   const url = `https://query.yahooapis.com/v1/public/yql?q=`;
  //   let YQL = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${place}")`;
  //   YQL = encodeURIComponent( YQL ) + `&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
  //   let response;
  //   try{
  //     response = await getServerData( url + YQL );
  //     if( response.status !== 200 ) throw new Error('unknow error');
  //   } catch( error ) {
  //     console.error( error );
  //     response = false;
  //   }
  //   return response.data || false;
  // }

  async getWeather( place ) {
    let response;
    try{
      response = await getServerData(`/get-weather?location=${place}`);
      if( response.status !== 200 ) throw new Error('unknow error');
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response.data || false;
  }
};

async function getServerData( url ) {
   return await axios.get( url );
};

module.exports = serverApi;