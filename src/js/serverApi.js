const axios = require('axios');

const serverApi = {
  async getCitiesBySubstring( substring ) {
    let response;
    try{
      response = await getServerData(`https://api.teleport.org/api/cities/?search=${substring}`);
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

  async getWeather( coord ) {
    const url = `https://query.yahooapis.com/v1/public/yql?q=`;
    let YQL = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${coord}")`;
    YQL = encodeURIComponent( YQL ) + `&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    let response;
    try{
      response = await getServerData( url + YQL );
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